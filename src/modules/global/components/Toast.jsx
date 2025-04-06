import { addToast } from "@heroui/toast";
import { 
    CircleCheck, 
    CircleX, 
    CircleAlert, 
    Info 
} from "lucide-react";

export const Toast = ({ 
    onConfirm,
    color = "primary",
    title,
    description
}) => {
    const iconMap = {
        success: <CircleCheck strokeWidth={2} className="w-5 h-5" />,
        danger: <CircleX strokeWidth={2} className="w-5 h-5" />,
        primary: <Info strokeWidth={2} className="w-5 h-5" />,
        secondary: <CircleAlert strokeWidth={2} className="w-5 h-5" />,
        default: <Info strokeWidth={2} className="w-5 h-5" />
    };

    const icon = iconMap[color] || iconMap.default;

    addToast({
        color: color,
        icon: icon,
        title: title,
        description: description
    });

    if (onConfirm) onConfirm();
};