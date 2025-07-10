import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loading({ className, size = "md", text }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-600 border-t-emerald-500",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}
