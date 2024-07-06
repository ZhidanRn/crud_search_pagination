"use client";

import Link from "next/link";
import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";


const Pagination = ({totalPages}:{totalPages: number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const cretePageURL = (pageNumber: string | number) => {
        const param = new URLSearchParams(searchParams);
        param.set("page", pageNumber.toString())
        return `${pathname}?${param.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages);

    const PaginationNumber = ({
        page,
        href,
        position,
        isActive
    }: {
        page: number | string;
        href: string;
        position:  "first" | "last" | "middle" | "single";
        isActive: boolean;
    }) => {
        const className = clsx("flex h-10 w-10 items-center justify-center text-sm border",{
            "rounded-l-sm": position === "first" || position === "single",
            "rounded-r-sm": position === "last" || position === "single",
            "z-10 bg-blue-700 border-blue-500 text-white": isActive,
            "hover:bg-gray-100": !isActive && position !== "middle",
            "text-gray-300 pointer-events-none": position === "middle"
        })

        return isActive && position === "middle" ? (
            <div className={className}>{page}</div>
        ) : (
            <Link href={href} className={className}>
                {page}
            </Link>
        )
    }

    const PaginationArrow = ({
        href,
        direction,
        isDisabled
    }: {
        href: string;
        direction: "left" | "right";
        isDisabled: boolean;
    }) => {
        const className = clsx("flex h-10 w-10 items-center justify-center text-sm border", {
            "pointer-events-none text-gray-300": isDisabled,
            "hover:bg-gray-100": !isDisabled,
            "mr-2": direction === "left",
            "ml-2": direction === "right"
        })

        const icon = direction === "left" ? (
            <HiChevronDoubleLeft size={20} />
        ) : (
            <HiChevronDoubleRight size={20} />
        )

        return isDisabled ? (
            <div className={className}>{icon}</div>
        ) : (
            <Link href={href} className={className}>
                {icon}
            </Link>
        )
    }

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                href={cretePageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position: "first" | "last" | "single" | "middle" = "middle";

                    if (index === 0) {
                        position = "first";
                    } else if (index === allPages.length - 1) {
                        position = "last";
                    } else if (allPages.length === 1) {
                        position = "single";
                    } else if (page === "..."){
                        position = "middle";
                    }

                    return (
                        <PaginationNumber
                            key={index}
                            page={page}
                            href={cretePageURL(page)}
                            position={position}
                            isActive={page === currentPage}
                        />
                    )
                })}

            </div>

            <PaginationArrow
                direction="right"
                href={cretePageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    )
}

export default Pagination;