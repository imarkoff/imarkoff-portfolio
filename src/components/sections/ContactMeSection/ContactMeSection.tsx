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
import TextArea from "@/components/ui/FormField/TextArea";
import Link from "next/link";
import AboutMe from "@/lib/models/AboutMe";
import SocialLinks from "@/components/layout/SocialLinks";

interface ContactMeSectionProps {
    aboutMe: AboutMe;
}

export default function ContactMeSection(
    {aboutMe}: ContactMeSectionProps
) {
    return (
        <Section
            slotProps={{
                root: {
                    style: {
                        background: "radial-gradient(70% 91% at -3% 93%, #A92CDD38 1%, #FF000000 99%),radial-gradient(90% 91% at 102% 36%, #DD2CA812 1%, #FF000000 99%)"
                    }
                },
                section: {
                    className: "flex flex-col gap-12 lg:gap-20 pb-5 md:pb-9 lg:pb-12"
                }
            }}
        >
            <div className={"flex flex-col lg:flex-row gap-6 lg:items-center"}>
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
                    {aboutMe.contactEmail && (
                        <LinkButton
                            href={`mailto:${aboutMe.contactEmail}`}
                            LeftIcon={MailIcon}
                            className={"w-fit"}
                        >
                            {aboutMe.contactEmail}
                        </LinkButton>
                    )}
                </div>
                <div className={"flex-1"}>
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
                </div>
            </div>
            <div className={"w-full bg-on-background grid grid-cols-2 lg:grid-cols-3 items-center gap-4 p-4 rounded-card border-border-menu border shadow-card"}>
                <div>
                    <Link href={"#home"} className={"text-logo font-bold text-gradient-logo leading-none"}>
                        imarkoff
                    </Link>
                    <Typography variant={"caption"} className={"!leading-none"}>
                        Vladyslav Hroshev
                    </Typography>
                </div>
                <div className={"flex items-center justify-end lg:justify-center gap-2"}>
                    <SocialLinks
                        socialLinks={aboutMe.socialLinks}
                        description={false}
                        buttonProps={{
                            isIconButton: true,
                            size: "small",
                            variant: "tertiary",
                        }}
                    />
                </div>
                <Typography variant={"caption"} className={"lg:text-end col-span-2 lg:col-span-1"}>
                    © 2025. Thanks for reaching the end. Here is a cookie 🍪 from me.
                </Typography>
            </div>
        </Section>
    );
}