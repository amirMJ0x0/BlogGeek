import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WritePage = () => {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <InputFile label={"عکس بنر :"} />
      </div>
      <div>
        <Label htmlFor="title">عنوان:</Label>
        <Input id="title" />
      </div>
      <div>
        <Label htmlFor="description">توضیحات</Label>
        <Textarea id="description" />
      </div>
      <SimpleEditor />
      <Button>تایید و انتشار</Button>
    </section>
  );
};

export default WritePage;
