import Partners from "@/app/components/Partners";
import { PortableText } from "next-sanity";

const Info = ({ content }) => {
  console.log(content.rules);
  return (
    <div className="px-[8%] pt-8 pb-20 flex flex-col gap-8">
      <div className="flex items-center sm:justify-between justify-center gap-3">
        <p className=" font-lilita-one text-primary text-clamp-title text-nowrap">
          {content.rules.title}
        </p>
        <div className=" h-1 w-full flex bg-tertiary"></div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="text-clamp-text text-senary text-justify leading-6">
          <PortableText value={content.rules.text} />
        </div>
      </div>
    </div>
  );
};

export default Info;
