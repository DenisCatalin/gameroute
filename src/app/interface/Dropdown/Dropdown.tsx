import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuOptions } from "../Dropdown/DropdownItem";
import DropdownItem from "./DropdownItem";

type MenuProps = {
  mainButton: React.ReactNode | string;
  options?: MenuOptions[];
  additionalOptions?: MenuOptions[];
  links?: MenuOptions[];
  responsive: boolean;
};

const Dropdown = ({ mainButton, options, additionalOptions, links, responsive }: MenuProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>{mainButton}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="divide-y divide-coverLight z-40 absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none bg-light dark:bg-darkMenu dark:divide-dark">
            {additionalOptions && (
              <div className={`${responsive && "lg:hidden"} px-1 py-1 z-40`}>
                {additionalOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    <DropdownItem
                      content={option.content}
                      icon={option.icon}
                      activeIcon={option.activeIcon}
                      onClick={option.onClick}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
            {links && (
              <div className={`${responsive && "lg:hidden"} px-1 py-1 z-40`}>
                {links.map((option, index) => (
                  <React.Fragment key={index}>
                    <DropdownItem
                      content={option.content}
                      icon={option.icon}
                      activeIcon={option.activeIcon}
                      onClick={option.onClick}
                      isLink={option.isLink}
                      linkTo={option.linkTo}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
            {options && (
              <div className="px-1 py-1 z-40">
                {options.map((option, index) => (
                  <React.Fragment key={index}>
                    <DropdownItem
                      content={option.content}
                      icon={option.icon}
                      onClick={option.onClick}
                      activeIcon={option.activeIcon}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
