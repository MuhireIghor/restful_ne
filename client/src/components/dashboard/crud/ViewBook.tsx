import {  Divider } from "@mantine/core";
import { FC } from "react";

import { IBook } from "@/types/base.type";
interface Props {
    book: IBook | null
}
const ViewBookComponent: FC<Props> = ({ book }) => {

    return (
        <div className="flex flex-col p-3 items-center w-full">

            <div className="flex w-full flex-col gap-y-3">
                <div className="flex flex-col gap-y-2 text-slate-500 w-full">
                    <div className="flex flex-col  gap-x-2">
                        <p className="font-bold">Book Name</p>
                        <p>{book?.name}</p>
                    </div>
                    <div className="flex flex-col gap-x-2">
                        <p className="font-bold">Book Author</p>
                        <p>{book?.author}</p>
                    </div>
                    <Divider w={"100%"} />
                    <div className="flex flex-col gap-x-2">
                        <p className="font-bold">Book Name</p>
                        <p>{book?.publisher}</p>
                    </div>
                </div>
            </div>
            <Divider w={"100%"} my={"md"} />
            <div className="flex w-full flex-col gap-y-3">
                <div className="flex flex-col gap-y-2 text-slate-500 w-full">
                    <div className="flex flex-col gap-x-2">
                        <p className="font-bold">Book Publication Year</p>
                        <p>{book?.publicationYear}</p>
                    </div>
                    <Divider w={"100%"} />
                    <div className="flex flex-col gap-x-2">
                        <p className="font-bold">Subject</p>
                        <p>{book?.subject}</p>
                    </div>
                </div>
            </div>



        </div>
    )
}
export default ViewBookComponent;