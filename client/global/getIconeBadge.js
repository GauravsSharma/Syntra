import { Badge } from "@/components/ui/badge";

  export const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (
                    <Badge
                        variant="default"
                        className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 shadow-none"
                    >
                        Active
                    </Badge>
                );

            case "training":
                return (
                    <Badge
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 shadow-none"
                    >
                        Training
                    </Badge>
                );

            case "error":
                return (
                    <Badge
                        variant="destructive"
                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 shadow-none"
                    >
                        Error
                    </Badge>
                );

            case "excluded":
                return (
                    <Badge
                        variant="secondary"
                        className="bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20 border-zinc-500/20 shadow-none"
                    >
                        Excluded
                    </Badge>
                );

            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };