"use client";

import { useState, useRef, ChangeEvent, DragEvent, MouseEvent, useEffect } from 'react';
import { Upload, Move, Download, Eraser, Circle, Undo2 } from 'lucide-react';

import { useExtractImgMutate } from '@/hooks/use-admin';
import { dataT } from './type';

import { Button } from '@/components/ui/button';

interface CropArea {
  id: number
  x: number
  y: number
  width: number
  height: number
  dragging: boolean
}

interface CroppedImage {
  dataUrl: string
  dimensions: {
    x: number
    y: number
    width: number
    height: number
  }
}

type ResizeDirection = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'

const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?)/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], { type: mime })
}

const getHandleClasses = (direction: ResizeDirection): string => {
  const baseClasses = "absolute w-3 h-3 bg-blue-500 rounded-full border border-white z-30"

  const positionClasses: Record<ResizeDirection, string> = {
    nw: "top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize",
    ne: "top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize",
    sw: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize",
    se: "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize",
    n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize",
    s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize",
    e: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
    w: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
  }

  return `${baseClasses} ${positionClasses[direction]}`
}


type props = {
  updateStep: (step: number, data: dataT | null) => void;
}

function Extractor({ updateStep }: props) {
  const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([])
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  const [crops, setCrops] = useState<CropArea[]>([
    { id: 1, x: 2.7, y: 22, width: 61.4, height: 53.9, dragging: false },
    { id: 2, x: 64.6, y: 26.1, width: 32.5, height: 48.3, dragging: false },
    { id: 3, x: 3.2, y: 76.7, width: 34.7, height: 16.2, dragging: false },
    { id: 4, x: 62.1, y: 76.7, width: 35, height: 16.2, dragging: false }
  ])

  const [maskSettings, setMaskSettings] = useState({
    size: 30,
    color: 'rgb(252,238,193)',
    type: 'rectangle',
  })
  const [currentHistory, setCurrentHistory] = useState(-1)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const { mutate, isPending } = useExtractImgMutate()

  useEffect(() => {
    if (selectedCrop === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return

      e.preventDefault()

      const step = e.shiftKey ? 1 : 0.5

      setCrops(prevCrops =>
        prevCrops.map(crop => {
          if (crop.id !== selectedCrop) return crop;

          let newCrop = { ...crop };

          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case 'ArrowRight':
                newCrop.width = Math.min(100 - crop.x, crop.width + step);
                break;
              case 'ArrowLeft':
                newCrop.width = Math.max(10, crop.width - step);
                break;
              case 'ArrowDown':
                newCrop.height = Math.min(100 - crop.y, crop.height + step);
                break;
              case 'ArrowUp':
                newCrop.height = Math.max(10, crop.height - step);
                break;
            }
          } else {
            switch (e.key) {
              case 'ArrowRight':
                newCrop.x = Math.min(100 - crop.width, crop.x + step);
                break;
              case 'ArrowLeft':
                newCrop.x = Math.max(0, crop.x - step);
                break;
              case 'ArrowDown':
                newCrop.y = Math.min(100 - crop.height, crop.y + step);
                break;
              case 'ArrowUp':
                newCrop.y = Math.max(0, crop.y - step);
                break;
            }
          }

          return newCrop;
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCrop])

  useEffect(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = image.width
    canvas.height = image.height

    ctx?.drawImage(image, 0, 0)

    saveState()
  }, [image])

  const saveState = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const imageData = canvas.toDataURL('image/png')

    const newHistory = [...history.slice(0, currentHistory + 1), imageData]
    setHistory(newHistory)
    setCurrentHistory(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (currentHistory <= 0) return

    const prevState = history[currentHistory - 1]
    setCurrentHistory(currentHistory - 1)

    if (prevState && canvasRef.current) {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d')
          ctx?.clearRect(0, 0, canvas.width, canvas.height)
          ctx?.drawImage(img, 0, 0)
        }
      }
      img.src = prevState
    }
  }

  const startDrawing = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    ctx.fillStyle = maskSettings.color

    if (maskSettings.type === 'rectangle') {
      ctx.fillRect(
        x - maskSettings.size / 2,
        y - maskSettings.size / 2,
        maskSettings.size,
        maskSettings.size
      )
    } else if (maskSettings.type === 'circle') {
      ctx.beginPath()
      ctx.arc(x, y, maskSettings.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  const downloadImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = 'masked-image.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const croppedImageDownload = (dataUrl: string, index: number): void => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `cropped-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetCrops = (): void => {
    setCrops([
      { id: 1, x: 2.7, y: 22, width: 61.4, height: 53.9, dragging: false },
      { id: 2, x: 64.6, y: 26.1, width: 32.5, height: 48.3, dragging: false },
      { id: 3, x: 3.2, y: 76.7, width: 34.7, height: 16.2, dragging: false },
      { id: 4, x: 62.1, y: 76.7, width: 35, height: 16.2, dragging: false }
    ])
    setSelectedCrop(null)
  }

  const onFileLoad = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      const img = new Image()
      img.onload = (): void => {
        setImage(img)
        cropImage(img)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      onFileLoad(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (): void => {
    setDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.match('image.*')) {
      onFileLoad(file)
    }
  }

  const handleImageContainerClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (
      e.target === imageContainerRef.current ||
      e.target === imageRef.current
    ) {
      setSelectedCrop(null);
    }
  }

  const startDrag = (e: MouseEvent<HTMLDivElement>, id: number): void => {
    e.stopPropagation()
    e.preventDefault()

    setCrops(prevCrops => prevCrops.map(crop =>
      crop.id === id ? { ...crop, dragging: true } : crop
    ))
    setSelectedCrop(id)

    const container = imageContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()

    const cropElement = e.currentTarget
    const cropRect = cropElement.getBoundingClientRect()
    const offsetX = e.clientX - cropRect.left
    const offsetY = e.clientY - cropRect.top

    const handleMouseMove = (moveEvent: MouseEvent): void => {
      moveEvent.preventDefault()

      const newLeft = moveEvent.clientX - containerRect.left - offsetX
      const newTop = moveEvent.clientY - containerRect.top - offsetY

      const newX = (newLeft / containerRect.width) * 100
      const newY = (newTop / containerRect.height) * 100

      setCrops(prevCrops =>
        prevCrops.map(crop => {
          if (crop.id === id) {
            const boundedX = Math.max(0, Math.min(100 - crop.width, newX))
            const boundedY = Math.max(0, Math.min(100 - crop.height, newY))

            return { ...crop, x: boundedX, y: boundedY }
          }
          return crop
        })
      )
    }

    const handleMouseUp = (): void => {
      setCrops(prevCrops =>
        prevCrops.map(crop =>
          crop.id === id ? { ...crop, dragging: false } : crop
        )
      )

      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const startResize = (e: MouseEvent<HTMLDivElement>, id: number, direction: ResizeDirection): void => {
    e.stopPropagation()
    e.preventDefault()

    const container = imageContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const cropToResize = crops.find(crop => crop.id === id)
    if (!cropToResize) return

    const initialCrop = { ...cropToResize }

    const initialMouseX = e.clientX
    const initialMouseY = e.clientY

    const handleMouseMove = (moveEvent: MouseEvent): void => {
      moveEvent.preventDefault()

      const dx = ((moveEvent.clientX - initialMouseX) / containerRect.width) * 100
      const dy = ((moveEvent.clientY - initialMouseY) / containerRect.height) * 100

      setCrops(prevCrops =>
        prevCrops.map(crop => {
          if (crop.id === id) {
            let newX = initialCrop.x
            let newY = initialCrop.y
            let newWidth = initialCrop.width
            let newHeight = initialCrop.height

            if (direction.includes('e')) {
              // East/right edge - adjust width only
              newWidth = Math.max(10, Math.min(100 - initialCrop.x, initialCrop.width + dx))
            }

            if (direction.includes('w')) {
              // West/left edge - adjust x and width
              const maxDx = initialCrop.width - 10
              const boundedDx = Math.max(-initialCrop.x, Math.min(maxDx, dx))
              newX = initialCrop.x + boundedDx
              newWidth = initialCrop.width - boundedDx
            }

            if (direction.includes('n')) {
              // North/top edge - adjust y and height
              const maxDy = initialCrop.height - 10
              const boundedDy = Math.max(-initialCrop.y, Math.min(maxDy, dy))
              newY = initialCrop.y + boundedDy
              newHeight = initialCrop.height - boundedDy
            }

            if (direction.includes('s')) {
              // South/bottom edge - adjust height only
              newHeight = Math.max(10, Math.min(100 - initialCrop.y, initialCrop.height + dy))
            }

            return { ...crop, x: newX, y: newY, width: newWidth, height: newHeight }
          }
          return crop
        })
      )
    }

    const handleMouseUp = (): void => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const cropImage = (image: HTMLImageElement): void => {
    if (!image) return

    const croppedResults: CroppedImage[] = []

    for (let i = 0; i < crops.length; i++) {
      const crop = crops[i]
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) continue

      const sourceX = (crop.x / 100) * image.width
      const sourceY = (crop.y / 100) * image.height
      const sourceWidth = (crop.width / 100) * image.width
      const sourceHeight = (crop.height / 100) * image.height

      canvas.width = sourceWidth
      canvas.height = sourceHeight

      ctx.drawImage(
        image,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      )

      const dataUrl = canvas.toDataURL('image/png')
      croppedResults.push({
        dataUrl,
        dimensions: { x: crop.x, y: crop.y, width: crop.width, height: crop.height }
      })
    }

    setFinalCrops(croppedResults, image)
  }

  const setFinalCrops = (results: CroppedImage[], image: HTMLImageElement): void => {
    const section3 = results[2]
    const section4 = results[3]

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const totalWidth = (section3.dimensions.width + section4.dimensions.width) * image.width / 100
    const height = section3.dimensions.height * image.height / 100

    canvas.width = totalWidth
    canvas.height = height

    const img3 = new Image()
    img3.onload = () => {
      ctx.drawImage(img3, 0, 0)

      const img4 = new Image()
      img4.onload = () => {
        ctx.drawImage(img4, section3.dimensions.width * image.width / 100, 0)

        const mergedDataUrl = canvas.toDataURL('image/png')

        const newResults = [
          results[0],
          results[1],
          {
            dataUrl: mergedDataUrl,
            dimensions: {
              x: section3.dimensions.x,
              y: section3.dimensions.y,
              width: section3.dimensions.width + section4.dimensions.width,
              height: section3.dimensions.height
            }
          }
        ]

        setCroppedImages(newResults)
      }
      img4.src = section4.dataUrl
    }
    img3.src = section3.dataUrl
  }

  const sendToBackend = async (): Promise<void> => {
    if (croppedImages.length === 0) return

    try {
      const formData = new FormData()

      croppedImages.forEach((img, index) => {
        const blob = dataURLtoBlob(img.dataUrl)
        formData.append("images", blob, `cropped-image-${index + 1}.png`)
      })

      if (canvasRef.current) {
        const imageData = canvasRef.current.toDataURL('image/png')
        const fetchResponse = await fetch(imageData)
        const blob = await fetchResponse.blob()
        formData.append("images", blob, "imasge4.png")
      }

      mutate(formData, {
        onSuccess(res) {
          updateStep(1, { image, uploaded: res?.imagePaths })
        }
      })
    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }

  return (
    <div className="p-6">
      {!image && (
        <div className='dc h-[80vh]'>
          <div
            className={`dc flex-col gap-0 p-12 w-full max-w-2xl border-2 border-dashed rounded-lg cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} hover:border-solid hover:shadow`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-500 mb-4">Drag and drop an image here, or click to select</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              onClick={e => e.stopPropagation()}
            />

            <Button asChild>
              <label
                htmlFor="image-upload"
                onClick={e => e.stopPropagation()}
              >
                <Upload className="h-4 w-4" />
                Select Image
              </label>
            </Button>
          </div>
        </div>
      )}

      {image && (
        <div className="w-full">
          <div className="df my-4">
            <Button
              size="sm"
              onClick={() => cropImage(image)}
              disabled={isPending}
            >
              Crop Image
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={resetCrops}
              disabled={isPending}
            >
              Reset Crops
            </Button>

            <Button
              size="sm"
              className='bg-blue-500 hover:bg-blue-600'
              onClick={() => setImage(null)}
              disabled={isPending}
            >
              New Image
            </Button>

            {
              croppedImages.length > 0 && (
                <Button
                  size="sm"
                  onClick={sendToBackend}
                  className='ml-auto bg-green-600 hover:bg-green-700'
                  disabled={isPending}
                >
                  Proceed
                </Button>
              )
            }
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col">
              <div
                ref={imageContainerRef}
                className="relative border rounded-lg overflow-hidden mb-4 isolate"
                onClick={handleImageContainerClick}
                onMouseDown={(e) => {
                  if (e.target === imageRef.current) {
                    e.preventDefault()
                  }
                }}
              >
                <img
                  ref={imageRef}
                  src={image.src}
                  alt="Original"
                  className="w-full h-auto select-none"
                  draggable="false"
                />

                {crops.map((crop) => (
                  <div
                    key={crop.id}
                    className={`absolute border-2 ${selectedCrop === crop.id ? 'border-blue-500' : 'border-red-500'} cursor-move select-none`}
                    style={{
                      left: `${crop.x}%`,
                      top: `${crop.y}%`,
                      width: `${crop.width}%`,
                      height: `${crop.height}%`,
                      zIndex: selectedCrop === crop.id ? 20 : 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCrop(crop.id)
                    }}
                    onMouseDown={(e) => startDrag(e, crop.id)}
                  >
                    <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white px-2 py-1 text-xs rounded">
                      Area {crop.id}
                      <Move className="h-3 w-3 inline ml-1" />
                    </div>

                    {selectedCrop === crop.id && (
                      <>
                        <div
                          className={getHandleClasses('nw')}
                          onMouseDown={(e) => startResize(e, crop.id, 'nw')}
                        ></div>
                        <div
                          className={getHandleClasses('ne')}
                          onMouseDown={(e) => startResize(e, crop.id, 'ne')}
                        ></div>
                        <div
                          className={getHandleClasses('sw')}
                          onMouseDown={(e) => startResize(e, crop.id, 'sw')}
                        ></div>
                        <div
                          className={getHandleClasses('se')}
                          onMouseDown={(e) => startResize(e, crop.id, 'se')}
                        ></div>
                        <div
                          className={getHandleClasses('n')}
                          onMouseDown={(e) => startResize(e, crop.id, 'n')}
                        ></div>
                        <div
                          className={getHandleClasses('s')}
                          onMouseDown={(e) => startResize(e, crop.id, 's')}
                        ></div>
                        <div
                          className={getHandleClasses('e')}
                          onMouseDown={(e) => startResize(e, crop.id, 'e')}
                        ></div>
                        <div
                          className={getHandleClasses('w')}
                          onMouseDown={(e) => startResize(e, crop.id, 'w')}
                        ></div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {selectedCrop && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Selected Area {crops.find(c => c.id === selectedCrop)?.id}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs mb-1">X Position (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={crops.find(c => c.id === selectedCrop)?.x.toFixed(1)}
                          onChange={(e) => {
                            const crop = crops.find(c => c.id === selectedCrop)
                            if (!crop) return
                            const newX = Math.max(0, Math.min(100 - crop.width, parseFloat(e.target.value) || 0))
                            setCrops(crops.map(c => c.id === selectedCrop ? { ...c, x: newX } : c))
                          }}
                          className="w-full border rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Y Position (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={crops.find(c => c.id === selectedCrop)?.y.toFixed(1)}
                          onChange={(e) => {
                            const crop = crops.find(c => c.id === selectedCrop)
                            if (!crop) return
                            const newY = Math.max(0, Math.min(100 - crop.height, parseFloat(e.target.value) || 0))
                            setCrops(crops.map(c => c.id === selectedCrop ? { ...c, y: newY } : c))
                          }}
                          className="w-full border rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Width (%)</label>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          step="0.1"
                          value={crops.find(c => c.id === selectedCrop)?.width.toFixed(1)}
                          onChange={(e) => {
                            const crop = crops.find(c => c.id === selectedCrop)
                            if (!crop) return
                            const newWidth = Math.max(10, Math.min(100 - crop.x, parseFloat(e.target.value) || 0))
                            setCrops(crops.map(c => c.id === selectedCrop ? { ...c, width: newWidth } : c))
                          }}
                          className="w-full border rounded p-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Height (%)</label>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          step="0.1"
                          value={crops.find(c => c.id === selectedCrop)?.height.toFixed(1)}
                          onChange={(e) => {
                            const crop = crops.find(c => c.id === selectedCrop)
                            if (!crop) return
                            const newHeight = Math.max(10, Math.min(100 - crop.y, parseFloat(e.target.value) || 0))
                            setCrops(crops.map(c => c.id === selectedCrop ? { ...c, height: newHeight } : c))
                          }}
                          className="w-full border rounded p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {croppedImages.length > 0 && (
              <div className="md:w-1/2">
                <div className="space-y-4">
                  {/* {
                    croppedImages.map((cropped, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden relative bg-white">
                        <div className="p-2 bg-gray-100 flex justify-between items-center border-b">
                          <span className="font-medium">Section {index + 1}</span>
                          <button
                            onClick={() => croppedImageDownload(cropped.dataUrl, index)}
                            className="dc p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="p-2">
                          <img
                            src={cropped.dataUrl}
                            alt={`Cropped ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    ))
                  } */}

                  <div className="border rounded-lg overflow-hidden relative bg-white">
                    <div className="p-2 bg-gray-100 flex justify-between items-center border-b">
                      <span className="font-medium">Profile Image</span>
                      <button
                        onClick={() => croppedImageDownload(croppedImages[1].dataUrl, 1)}
                        className="dc p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="dc p-2">
                      <img
                        src={croppedImages[1].dataUrl}
                        alt="Cropped 1"
                        className="w-40 h-40 rounded-full object-cover border-4 border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden relative bg-white">
                    <div className="p-2 bg-gray-100 flex justify-between items-center border-b">
                      <span className="font-medium">Verdict Image</span>
                      <button
                        onClick={() => croppedImageDownload(croppedImages[2].dataUrl, 2)}
                        className="dc p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-2">
                      <img
                        src={croppedImages[2].dataUrl}
                        alt="Cropped 2"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}

            <div className="md:w-1/2">
              <div className="border rounded overflow-auto">
                <div className='df px-4 py-2 border-b'>
                  <h6 className='flex-1'>Mask Image</h6>

                  <button
                    onClick={handleUndo}
                    disabled={currentHistory <= 0}
                    className="dc p-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                  >
                    <Undo2 size={16} />
                    <span className='sr-only'>Undo</span>
                  </button>

                  <button
                    onClick={downloadImage}
                    className="dc p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                  >
                    <Download size={16} />
                    <span className='sr-only'>Download</span>
                  </button>
                </div>

                <div className="p-4 relative">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="object-contain"
                    style={{
                      cursor: isDrawing ? 'none' : 'crosshair',
                      height: '640px'
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6 bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col mb-2">
                  <label className="text-sm text-gray-600">Mask Type</label>
                  <div className="flex gap-2 mt-1">
                    <button
                      className={`flex-1 p-2 border rounded-l ${maskSettings.type === 'rectangle' ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                      onClick={() => setMaskSettings({ ...maskSettings, type: 'rectangle' })}
                    >
                      <Eraser size={16} className="mx-auto" />
                    </button>
                    <button
                      className={`flex-1 p-2 border rounded-r ${maskSettings.type === 'circle' ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                      onClick={() => setMaskSettings({ ...maskSettings, type: 'circle' })}
                    >
                      <Circle size={16} className="mx-auto" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className='df justify-between'>
                    <label className="text-sm text-gray-600">Mask Size</label>
                    <p className="text-xs text-gray-500 text-center">{maskSettings.size}px</p>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={maskSettings.size}
                    onChange={(e) => setMaskSettings({ ...maskSettings, size: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Extractor
