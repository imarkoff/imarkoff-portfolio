import Button from "@/app/components/ui/Button";
import Section from "@/app/components/ui/Section";
import ProgressActivityIcon from "@/app/components/icons/ProgressActivityIcon";

export default function Home() {
  return (
      <main>
          <Section>
              <Button color={"accent"} variant={"primary"} LeftIcon={ProgressActivityIcon} RightIcon={ProgressActivityIcon}>
                  Active Icon Button
              </Button>
          </Section>
      </main>
  );
}
