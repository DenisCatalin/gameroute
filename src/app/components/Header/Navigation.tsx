"use client";

import { setAppCurrentPage } from "@/app/redux/app.slice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

type LinkProps = {
  content: string;
  linkTo: string;
};

const NavLinks: LinkProps[] = [
  {
    content: "home",
    linkTo: "/",
  },
  {
    content: "scrap",
    linkTo: "/scrap",
  },
  {
    content: "statues",
    linkTo: "/statues",
  },
];

const Navigation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleClick = (page: string) => {
    const correctPage = page === "/" ? page.replaceAll("/", "home") : page.replaceAll("/", "");
    dispatch(setAppCurrentPage(correctPage));
    console.log(correctPage);
  };

  useEffect(() => {
    const correctPage =
      pathname === "/" ? pathname.replaceAll("/", "home") : pathname.replaceAll("/", "");
    dispatch(setAppCurrentPage(correctPage));
  }, []);

  const currentPage = useSelector((state: any) => state.app.currentPage);
  return (
    <ul className="2xsm:hidden lg:flex w-100percent h-3/4 justify-evenly items-center">
      {NavLinks.map((link, index) => (
        <Link
          className="font-bold text-xl"
          key={index}
          href={link.linkTo}
          onClick={() => handleClick(link.linkTo)}
        >
          <li
            key={index}
            className={`flex justify-center items-center w-auto px-4 rounded-regular h-12 transition text-dark focus:bg-main dark:text-light hover:bg-main hover:text-light ${
              link.content === currentPage ? "bg-main text-light" : ""
            }`}
          >
            {link.content.toUpperCase()}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Navigation;
