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
    linkTo: "/resources/scrap",
  },
  {
    content: "statues",
    linkTo: "/resources/statues",
  },
  {
    content: "treasures",
    linkTo: "/resources/treasures",
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
  const prefix = currentPage.includes("resources")
    ? currentPage.split("resources")[1]
    : currentPage;
  return (
    <ul className="2xsm:hidden lg:flex w-128 h-3/4 justify-evenly items-center">
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
              link.content === prefix
                ? "bg-main text-light shadow-productLightShadow dark:shadow-productDarkShadow"
                : ""
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
