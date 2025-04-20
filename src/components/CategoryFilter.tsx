
import React from 'react';
import { Button } from "@/components/ui/button";
import { Category, categoryLabels } from '@/data/conversationStarters';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className={cn(
          "rounded-full",
          selectedCategory === null ? "bg-chat-dark text-white" : "bg-white"
        )}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "rounded-full",
            selectedCategory === category ? "bg-chat-dark text-white" : "bg-white"
          )}
        >
          {categoryLabels[category]}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
