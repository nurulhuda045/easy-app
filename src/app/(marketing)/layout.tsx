import { NavBar } from "./_components/NavBar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="selection:bg-[hsl(320,65%,52%,20%)]">
             <NavBar />
            {children}
        </div>
    )
}