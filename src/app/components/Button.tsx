
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {
    dialog: boolean,
    setDialog: (value: boolean) => void
    
}

export default function ButtonOutline({setDialog}: Props) {
    const handleClick = () => {
        setDialog(true)
    
    }
  return <Button onClick={handleClick} variant="ghost" className="w-[200px] ml-[20px] border flex justify-around">Add Interview <Plus /></Button>
}
