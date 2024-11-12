import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, Link, User2 } from "lucide-react";

export const BoardList = async () => {

  const {orgId} = auth()

  if(!orgId){
    // return redirect("/select-org")
  }

  // const boards = await db.board.findMany({
  //   where: {
  //     orgId,
  //   },
  //   orderBy:{
  //     createdAt : "desc"
  //   },
  // });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {boards.map((board)=>(
          <Link
          key={board.id}
          href={`/board/${board.id}`}
          style={{backgroundImage: `url(${board.})`}}
          >
        
          </Link>
        ))} */}
        <FormPopover sideOffset={10} side="right">
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm"> create a new board</p>
          <span className="text-sm"> 5 remaining</span>
          <Hint
            SideOffSet={40}
            Description={`fest`}
          >
            <HelpCircle 
              className="absolute bottom-2 right-2 h-[14px] w-[14px]"
            />

          </Hint>
        </div>
        </FormPopover>
      </div>
    </div>
  );
};
