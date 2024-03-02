import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

type Props = {
  options: string[];
  value: string;
  select: (option: string) => void;
};

const Select = ({ options, value, select }: Props) => {
  return (
    <Listbox value={value} onChange={select}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-coverLight py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-darkMain focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-darkMain sm:text-sm dark:bg-coverDark">
          <span className="block truncate text-dark dark:text-light font-bold">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiOutlineChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-coverLight dark:bg-coverDark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            {options.map((option: string, index: number) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative font-bold cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-light dark:bg-dark text-dark dark:text-light"
                      : "text-gray-900 dark:text-light"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-bold" : "font-medium"}`}>
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-darkMain">
                        <FaCheck className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
