"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type FaqItem = { question: string; answer: string; category: string };
export type StatItem = { value: string; label: string };
export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  details: string[];
};

export const FaqEditor = ({
  items,
  onChange,
}: {
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}) => {
  const update = (index: number, patch: Partial<FaqItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">FAQ items</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...items,
              { question: "", answer: "", category: "General" },
            ])
          }
        >
          <Plus className="mr-1 h-4 w-4" />
          Add FAQ
        </Button>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-2 rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="flex justify-between gap-2">
            <p className="text-xs font-semibold text-slate-500">FAQ #{index + 1}</p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-rose-600"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Category</Label>
              <Input
                value={item.category}
                onChange={(e) => update(index, { category: e.target.value })}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Question</Label>
              <Input
                value={item.question}
                onChange={(e) => update(index, { question: e.target.value })}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Answer</Label>
              <Textarea
                rows={3}
                value={item.answer}
                onChange={(e) => update(index, { answer: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatsEditor = ({
  items,
  onChange,
}: {
  items: StatItem[];
  onChange: (items: StatItem[]) => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-slate-700">Hero stats</h3>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, { value: "", label: "" }])}
      >
        <Plus className="mr-1 h-4 w-4" />
        Add stat
      </Button>
    </div>
    {items.map((item, index) => (
      <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <Input
          placeholder="Value (e.g. 99.9%)"
          value={item.value}
          onChange={(e) =>
            onChange(
              items.map((row, i) =>
                i === index ? { ...row, value: e.target.value } : row,
              ),
            )
          }
        />
        <Input
          placeholder="Label"
          value={item.label}
          onChange={(e) =>
            onChange(
              items.map((row, i) =>
                i === index ? { ...row, label: e.target.value } : row,
              ),
            )
          }
        />
        <Button
          type="button"
          variant="ghost"
          className="text-rose-600"
          onClick={() => onChange(items.filter((_, i) => i !== index))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
);

export const ServicesEditor = ({
  items,
  onChange,
}: {
  items: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
}) => {
  const update = (index: number, patch: Partial<ServiceItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Services</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...items,
              {
                id: `service-${items.length + 1}`,
                title: "",
                description: "",
                highlight: "",
                details: [""],
              },
            ])
          }
        >
          <Plus className="mr-1 h-4 w-4" />
          Add service
        </Button>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-2 rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-slate-500">
              Service #{index + 1}
            </p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-rose-600"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="space-y-1">
              <Label>ID (deposit/withdraw/transfer/loan)</Label>
              <Input
                value={item.id}
                onChange={(e) => update(index, { id: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={item.title}
                onChange={(e) => update(index, { title: e.target.value })}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) =>
                  update(index, { description: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Highlight badge</Label>
              <Input
                value={item.highlight}
                onChange={(e) => update(index, { highlight: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bullet points</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  update(index, { details: [...(item.details || []), ""] })
                }
              >
                <Plus className="mr-1 h-3 w-3" />
                Add point
              </Button>
            </div>
            {(item.details || []).map((detail, dIndex) => (
              <div key={dIndex} className="flex gap-2">
                <Input
                  value={detail}
                  onChange={(e) => {
                    const details = [...(item.details || [])];
                    details[dIndex] = e.target.value;
                    update(index, { details });
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-rose-600"
                  onClick={() =>
                    update(index, {
                      details: (item.details || []).filter(
                        (_, i) => i !== dIndex,
                      ),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
