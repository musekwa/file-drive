import Image from "next/image";
import { UploadButton } from "./upload-button";


const Placeholder = ()=> {
    return (
      <div className="flex flex-col gap-8 justify-center items-center mt-24">
        <Image
          alt="Empty folder picture"
          src="/empty.svg"
          width={300}
          height={300}
        />
        <div className="text-2xl">You have no files, upload one now!</div>
        <UploadButton />
      </div>
    );
  }

  export default Placeholder;