"use client";

import { useState, useRef, ChangeEvent, DragEvent, MouseEvent } from 'react';
import { Upload, Save, Move } from 'lucide-react';

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

function Extractor() {
  const [croppedImages, setCroppedImages] = useState<CroppedImage[]>([])
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  const [crops, setCrops] = useState<CropArea[]>([
    { id: 1, x: 2.7, y: 22, width: 61.4, height: 53.9, dragging: false },
    { id: 2, x: 64.6, y: 26.1, width: 32.5, height: 48.3, dragging: false },
    { id: 3, x: 3.2, y: 76.7, width: 34.7, height: 16.2, dragging: false },
    { id: 4, x: 62.1, y: 76.7, width: 35, height: 16.2, dragging: false }
  ])

  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const img = new Image()
        img.onload = (): void => {
          setImage(img)
          setCroppedImages([])
          resetCrops()
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const resetCrops = (): void => {
    setCrops([
      { id: 1, x: 2.7, y: 22, width: 61.4, height: 53.9, dragging: false },
      { id: 2, x: 64.6, y: 26.1, width: 32.5, height: 48.3, dragging: false },
      { id: 3, x: 3.2, y: 76.7, width: 34.7, height: 16.2, dragging: false },
      { id: 4, x: 62.1, y: 76.7, width: 35, height: 16.2, dragging: false }
    ])
    setSelectedCrop(null)
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
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const img = new Image()
        img.onload = (): void => {
          setImage(img)
          setCroppedImages([])
          resetCrops()
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const startDrag = (e: MouseEvent<HTMLDivElement>, id: number): void => {
    e.stopPropagation()

    const updatedCrops = crops.map(crop =>
      crop.id === id ? { ...crop, dragging: true } : crop
    )

    setCrops(updatedCrops)
    setSelectedCrop(id)

    const container = imageContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    setLastMousePos({ x: e.clientX, y: e.clientY })

    const handleMouseMove = (moveEvent: MouseEvent): void => {
      const currentX = moveEvent.clientX
      const currentY = moveEvent.clientY

      const dx = ((currentX - lastMousePos.x) / containerRect.width) * 100
      const dy = ((currentY - lastMousePos.y) / containerRect.height) * 100

      setLastMousePos({ x: currentX, y: currentY })

      setCrops(prevCrops =>
        prevCrops.map(crop => {
          if (crop.id === id) {
            let newX = Math.max(0, Math.min(100 - crop.width, crop.x + dx))
            let newY = Math.max(0, Math.min(100 - crop.height, crop.y + dy))

            return { ...crop, x: newX, y: newY }
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
    setLastMousePos({ x: e.clientX, y: e.clientY })

    const cropToResize = crops.find(crop => crop.id === id)
    if (!cropToResize) return

    const handleMouseMove = (moveEvent: MouseEvent): void => {
      const currentX = moveEvent.clientX
      const currentY = moveEvent.clientY

      const dx = ((currentX - lastMousePos.x) / containerRect.width) * 100
      const dy = ((currentY - lastMousePos.y) / containerRect.height) * 100

      setLastMousePos({ x: currentX, y: currentY })

      setCrops(prevCrops =>
        prevCrops.map(crop => {
          if (crop.id === id) {
            let newX = crop.x
            let newY = crop.y
            let newWidth = crop.width
            let newHeight = crop.height

            if (direction === 'ne' || direction === 'se' || direction === 'e') {
              // Right edge - adjust width
              newWidth = Math.max(10, Math.min(100 - crop.x, crop.width + dx))
            }

            if (direction === 'nw' || direction === 'sw' || direction === 'w') {
              // Left edge - adjust x and width
              const maxDx = crop.width - 10 // Ensure minimum width
              const boundedDx = Math.max(-crop.x, Math.min(maxDx, dx))
              newX = crop.x + boundedDx
              newWidth = crop.width - boundedDx
            }

            if (direction === 'nw' || direction === 'ne' || direction === 'n') {
              // Top edge - adjust y and height
              const maxDy = crop.height - 10 // Ensure minimum height
              const boundedDy = Math.max(-crop.y, Math.min(maxDy, dy))
              newY = crop.y + boundedDy
              newHeight = crop.height - boundedDy
            }

            if (direction === 'sw' || direction === 'se' || direction === 's') {
              // Bottom edge - adjust height
              newHeight = Math.max(10, Math.min(100 - crop.y, crop.height + dy))
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

  const cropImage = (): void => {
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

    if (croppedResults.length >= 4) {
      mergeSections3And4(croppedResults)
    } else {
      setCroppedImages(croppedResults)
    }
  }

  const mergeSections3And4 = (results: CroppedImage[]): void => {
    if (results.length < 4 || !image) return

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
        formData.append(`image-${index + 1}`, blob, `cropped-image-${index + 1}.png`)
      })

    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }

  return (
    <div className="p-6">
      {!image && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 w-full max-w-2xl flex flex-col items-center justify-center cursor-pointer ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-500 mb-4">Drag and drop an image here, or click to select</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />

          <Button asChild>
            <label htmlFor="image-upload">
              <Upload className="h-4 w-4" />
              Select Image
            </label>
          </Button>
        </div>
      )}

      {image && (
        <div className="w-full">
          <div className="df my-4">
            <Button
              size="sm"
              onClick={cropImage}
            >
              Crop Image
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={resetCrops}
            >
              Reset Crops
            </Button>

            <Button
              size="sm"
              className='bg-blue-500 hover:bg-blue-600'
              onClick={() => setImage(null)}
            >
              New Image
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col">
              <div
                ref={imageContainerRef}
                className="relative border rounded-lg overflow-hidden mb-4"
              >
                <img
                  ref={imageRef}
                  src={image.src}
                  alt="Original"
                  className="w-full h-auto"
                />

                {crops.map((crop) => (
                  <div
                    key={crop.id}
                    className={`absolute border-2 ${selectedCrop === crop.id ? 'border-blue-500' : 'border-red-500'} cursor-move`}
                    style={{
                      left: `${crop.x}%`,
                      top: `${crop.y}%`,
                      width: `${crop.width}%`,
                      height: `${crop.height}%`,
                      zIndex: selectedCrop === crop.id ? 20 : 10
                    }}
                    onClick={() => setSelectedCrop(crop.id)}
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
                  <h3 className="font-medium mb-4">Crop Controls</h3>

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
                <div className="df mb-4 ">
                  <h3 className="font-medium">Cropped Sections</h3>

                  <Button
                    onClick={sendToBackend}
                  >
                    <Save className="h-4 w-4" />
                    Send to Server
                  </Button>
                </div>

                <div className="space-y-4">
                  {
                    croppedImages.map((cropped, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden relative bg-white">
                        <div className="p-2 bg-gray-100 flex justify-between items-center border-b">
                          <span className="font-medium">Section {index + 1}</span>
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
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Extractor
