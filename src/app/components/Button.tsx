
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ShinyButton from "./ui/ShinyButton"

type Props = {
    dialog: boolean,
    setDialog: (value: boolean) => void
    
}

export default function ButtonOutline({setDialog}: Props) {
    const handleClick = () => {
        setDialog(true)
    
    }
  return <ShinyButton setDialog={setDialog} />
}
