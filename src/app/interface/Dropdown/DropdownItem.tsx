import React from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";

export type MenuOptions = {
  content: string | null | React.ReactNode;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?: () => void;
  isLink?: boolean;
  linkTo?: string;
};

const DropdownItem = ({ content, icon, activeIcon, onClick, isLink, linkTo }: MenuOptions) => {
  return (
    <>
      {isLink ? (
        <Menu.Item>
          {({ active }) => (
            <Link
              href={linkTo ? linkTo : "/"}
              className={`${
                active ? "bg-main text-light" : "text-dark dark:text-light"
              } group flex w-full items-center rounded-md px-3 py-3 mt-2 text-sm mb-2 transition-all`}
            >
              {active ? <>{activeIcon}</> : <>{icon}</>}
              {content}
            </Link>
          )}
        </Menu.Item>
      ) : (
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onClick}
              className={`${
                active ? "bg-main text-light" : "text-dark dark:text-light"
              } group flex w-full items-center rounded-md px-3 py-3 mt-2 text-sm mb-2 transition-all`}
            >
              {active ? <>{activeIcon}</> : <>{icon}</>}
              {content}
            </button>
          )}
        </Menu.Item>
      )}
    </>
  );
};

export default DropdownItem;
