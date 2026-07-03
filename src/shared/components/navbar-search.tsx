import * as Icons from "@tabler/icons-react";
import { useState } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "./primitives/combobox";

const NavbarSearch = ({
    latitude,
    longitude,
}: {
    latitude: number;
    longitude: number;
}) => {
    const [inputValue, setInputValue] = useState("");

    let a = "Dental";

    const Icon = Icons[`Icon${a as never}`];

    return (
        <Combobox>
            <ComboboxInput
                className="w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                showTrigger={false}
                placeholder="Search services, products, businesses..."
            />
            <ComboboxContent>
                <ComboboxEmpty className="py-10">No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
};

export default NavbarSearch;
