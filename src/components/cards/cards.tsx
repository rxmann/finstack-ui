import { TrendingUp, TrendingDown } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    CardAction,
} from "@/components/ui/card";
import {SectionCardsProps, StatCardProps} from "@/types/Dashboard";
import {Badge} from "@/components/ui/badge";

export function DashboardSectionCards({ cards }: SectionCardsProps) {
    return (
        <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:gap-4 lg:px-4">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
}

export function StatCard({
                             label,
                             value,
                             change,
                             description,
                             footer,
                             trend,
                             icon: Icon,
                         }: StatCardProps) {
    const trendDirection = trend || (change >= 0 ? "up" : "down");
    const isPositive = trendDirection === "up";
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card className="@container/card">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">{label}</CardDescription>
                <CardTitle className="text-lg font-semibold tabular-nums">
                    {value}
                </CardTitle>
                <CardAction className="py-1">
                    <Badge variant="outline" className="text-xs">
                        <TrendIcon className="size-3" />
                        {isPositive ? "+" : ""}
                        {change}%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-xs">
                <div className="line-clamp-1 flex gap-1 font-medium">
                    {Icon && <Icon className="size-3" />}
                    {description}
                </div>
                <div className="text-muted-foreground text-xs">{footer}</div>
            </CardFooter>
        </Card>
    );
}