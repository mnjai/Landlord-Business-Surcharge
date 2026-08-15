import { Container } from "@/components/ui/Container";
import { Clocks } from "./Clocks";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function UtilityBar() {
  return (
    <div className="bg-ink font-mono text-[11.5px] text-[#B9C3D2]">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-2">
        <Clocks />
        <CurrencySwitcher />
      </Container>
    </div>
  );
}
