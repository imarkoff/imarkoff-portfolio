import Section from "@/components/ui/Section";
import TypographyIcon from "@/components/ui/TypographyIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import Typography from "@/components/ui/Typography";
import LinkButton from "@/components/ui/Button/LinkButton";
import MailIcon from "@/components/icons/MailIcon";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/FormField/Input";
import AccountCircleIcon from "@/components/icons/AccountCircleIcon";
import AlternateEmailIcon from "@/components/icons/AlternateEmailIcon";
import Button from "@/components/ui/Button/Button";
import SendIcon from "@/components/icons/SendIcon";

interface ContactMeSectionProps {
    email?: string;
}

export default function ContactMeSection(
    {email}: ContactMeSectionProps
) {
    return (
        <Section
            slotProps={{
                section: {
                    className: "flex flex-col lg:flex-row gap-6 lg:items-center"
                }
            }}
        >
            <div className={"flex-1 flex flex-col gap-4 md:items-center lg:items-start md:text-center lg:text-left"}>
                <div className={"flex gap-2.5 items-center"}>
                    <TypographyIcon Icon={ChatIcon} variant={"h1"} />
                    <Typography variant={"h1"} component={"h2"}>
                        Want to get in touch?
                    </Typography>
                </div>
                <Typography>
                    Build a hard-loaded CRM, or just want to say hello? <br/>
                    I am always open to discussing. Start by filling the form or writing an email.
                </Typography>
                {email && (
                    <LinkButton
                        href={`mailto:${email}`}
                        LeftIcon={MailIcon}
                        className={"w-fit"}
                    >
                        {email}
                    </LinkButton>
                )}
            </div>
            <div className={"flex-1"}>
                <Card className={"flex flex-col gap-2.5 md:w-[450px] md:mx-auto lg:mr-0"}>
                    <Input
                        id={"contact-name"}
                        label={"Your Name"}
                        labelIcon={<TypographyIcon Icon={AccountCircleIcon} />}
                        placeholder={"Enter your name"}
                    />
                    <Input
                        id={"contact-email"}
                        label={"Your Email"}
                        labelIcon={<TypographyIcon Icon={AlternateEmailIcon} />}
                        type={"email"}
                        placeholder={"johndoe@exaple.com"}
                    />
                    <Input
                        id={"contact-message"}
                        label={"Your Message"}
                        placeholder={"Write your message here..."}
                        maxLength={500}
                        rows={5}
                        component={"textarea"}
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
            </div>
        </Section>
    );
}