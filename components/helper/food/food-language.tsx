import { Select,SelectTrigger,SelectValue,SelectItem,SelectGroup,SelectContent,SelectLabel} from "@/components/ui/select";

const FoodLanguage = () => {
    return (   
        <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue className="text-l font-bold" placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            <SelectItem  className="text-medium font-semibold" value="en">en</SelectItem>
            <SelectItem  className="text-medium font-semibold"  value="jp">jp</SelectItem>
            <SelectItem  className="text-medium font-semibold"  value="fr">fr</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
 
export default FoodLanguage;