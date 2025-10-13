import { Check, Copy } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

import useClipboardCopy from "@/hooks/use-clipboard-copy";

type props = { number: string }
function NumberCopy({ number }: props) {
  const { copied, onCopyClk, selectTextRef, onTextClk } = useClipboardCopy()

  return (
    <InputGroup>
      <InputGroupInput
        readOnly
        defaultValue={number}
        ref={selectTextRef}
        onClick={onTextClk}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy"
          title="Copy"
          size="icon-xs"
          onClick={() => onCopyClk(number)}
        >
          {copied ? <Check /> : <Copy />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export default NumberCopy
