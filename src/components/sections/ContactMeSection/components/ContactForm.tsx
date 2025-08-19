import Input from "@/components/ui/FormField/Input";
import TypographyIcon from "@/components/ui/TypographyIcon";
import AccountCircleIcon from "@/components/icons/AccountCircleIcon";
import AlternateEmailIcon from "@/components/icons/AlternateEmailIcon";
import TextArea from "@/components/ui/FormField/TextArea";
import ChatIcon from "@/components/icons/ChatIcon";
import Button from "@/components/ui/Button/Button";
import SendIcon from "@/components/icons/SendIcon";
import Card from "@/components/ui/Card";

export default function ContactForm() {
    return (
        <Card className={"flex flex-col gap-2.5 md:w-[450px] md:mx-auto lg:mr-0"}>
            <Input
                id={"contact-name"}
                label={"Your Name"}
                labelIcon={<TypographyIcon Icon={AccountCircleIcon} />}
                autoComplete={"name"}
                placeholder={"Enter your name"}
            />
            <Input
                id={"contact-email"}
                label={"Your Email"}
                labelIcon={<TypographyIcon Icon={AlternateEmailIcon} />}
                type={"email"}
                placeholder={"johndoe@exaple.com"}
            />
            <TextArea
                id={"contact-message"}
                label={"Your Message"}
                labelIcon={<TypographyIcon Icon={ChatIcon} />}
                placeholder={"Write your message here..."}
                maxLength={500}
                rows={5}
            />
            <Button
                type={"submit"}
                RightIcon={SendIcon}
                className={"w-full"}
                variant={"primary"}
            >
                Send Message
            </Button>
        </Card>
    );
}