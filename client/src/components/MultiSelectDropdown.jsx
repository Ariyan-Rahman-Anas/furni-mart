import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const MultiSelectDropdown = ({ options, value, onChange, placeholder = "Select items..." }) => {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    // Filter options based on the search query
    const filteredOptions = options?.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Handle the selection and deselection of items
    const handleSelect = (selectedValue) => {
        if (value.includes(selectedValue)) {
            // Deselect the item
            onChange(value?.filter((val) => val !== selectedValue))
        } else {
            // Select the item
            onChange([...value, selectedValue])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w[250] w-full h-auto border- justify-between"
                >
                    {/* Display selected items as tags */}
                    <div className="flex flex-col flex-wrap gap-1 h-auto  ">
                        {value?.length > 0
                            ? value.map((val) => {
                                const label = options.find((option) => option.value === val)?.label
                                return label ? (
                                    <p
                                        key={val}
                                        className="inline-flex items-center gap-1 bg-blue-500 text-blue-800 rounded-full px-2 py-1 text-xs"
                                    >
                                        {label}
                                    </p>
                                ) : null
                            })
                            : <span className="text-gray-500 font-normal ">{placeholder}</span> }
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search items..."
                        className="h-9"
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            console.log("Updated Search Query:", e.target.value) // Debugging log for search query update
                        }} // Updating search query value
                    />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {filteredOptions?.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)} // Toggle item selection
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value.includes(option.value) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))
                            ) : (
                                <CommandEmpty>No items found.</CommandEmpty>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelectDropdown