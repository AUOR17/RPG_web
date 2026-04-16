import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'success' | 'danger' | 'warning' | 'outline'
}

export default function Button ({
    children,
    variant = 'primary',
    className = '',
    ...props //def Button(self,variant='primary', className='', **args)
}: ButtonProps){

    const baseClasses = "w-full font-bold py-2 px-4 rounded transition-colors duration-200 shadow-sm";

    const colorVariants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white",
        success: "bg-emerald-600 hover:bg-emerald-500 text-white",
        danger: "bg-red-600 hover:bg-red-500 text-white",
        warning: "bg-amber-600 hover:bg-amber-500 text-white",
        outline: "bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white"
    };

    return(
        <button
            className={`${baseClasses} ${colorVariants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}