import React from 'react'

const EmptyState = ({ 
    title = "Nothing here yet", 
    description = "Items you add will appear here", 
    actionText, 
    onAction,
    icon 
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {icon && (
                <div className="mb-4 text-gray-300">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-medium text-gray-600 mb-2">{title}</h3>
            <p className="text-gray-400 mb-6 max-w-md">{description}</p>
            {actionText && onAction && (
                <button
                    onClick={onAction}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dull transition"
                >
                    {actionText}
                </button>
            )}
        </div>
    )
}

export default EmptyState