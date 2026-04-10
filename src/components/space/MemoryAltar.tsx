import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Bookmark, Heart, Star, Calendar, Feather, Plus, Trash2 } from "lucide-react";

const memoryTypes = [
  { key: "all", icon: Star, label: "altar.all" },
  { key: "ritual", icon: Bookmark, label: "altar.ritual" },
  { key: "vow", icon: Heart, label: "altar.vow" },
  { key: "moment", icon: Feather, label: "altar.moment" },
  { key: "date", icon: Calendar, label: "altar.date" },
];

interface Memory {
  id: string;
  memory_type: string;
  title: string;
  content: string | null;
  pinned: boolean;
  created_at: string;
  author_id: string;
}

interface Props {
  coupleId: string;
}

const MemoryAltar = ({ coupleId }: Props) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState("moment");

  useEffect(() => {
    if (!coupleId) return;
    const load = async () => {
      const { data } = await supabase
        .from("memory_altar")
        .select("*")
        .eq("couple_id", coupleId)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (data) setMemories(data as Memory[]);
    };
    load();
  }, [coupleId]);

  const addMemory = async () => {
    if (!newTitle.trim() || !user) return;
    const { data } = await supabase.from("memory_altar").insert({
      couple_id: coupleId,
      author_id: user.id,
      memory_type: newType,
      title: newTitle.trim(),
      content: newContent.trim() || null,
    }).select().single();
    if (data) {
      setMemories((prev) => [data as Memory, ...prev]);
      setNewTitle("");
      setNewContent("");
      setShowAdd(false);
    }
  };

  const deleteMemory = async (id: string) => {
    await supabase.from("memory_altar").delete().eq("id", id);
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const filtered = filter === "all" ? memories : memories.filter((m) => m.memory_type === filter);

  return (
    <div className="px-4 py-6">
      <div className="text-center mb-6">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
          {t("altar.title")}
        </h3>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-md mx-auto">
          {t("altar.subtitle")}
        </p>
      </div>

      {/* Filter + Add */}
      <div className="flex items-center justify-between mb-5 max-w-lg mx-auto">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {memoryTypes.map((mt) => {
            const Icon = mt.icon;
            return (
              <button
                key={mt.key}
                onClick={() => setFilter(mt.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all border ${
                  filter === mt.key
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(mt.label)}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="h-9 w-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center hover:bg-primary/25 transition-colors shrink-0 ml-2"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="max-w-lg mx-auto mb-6 p-4 rounded-2xl border border-primary/20 bg-primary/5 animate-fade-in">
          <div className="flex gap-1.5 mb-3">
            {memoryTypes.filter((m) => m.key !== "all").map((mt) => (
              <button
                key={mt.key}
                onClick={() => setNewType(mt.key)}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-all ${
                  newType === mt.key
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "text-muted-foreground border-border/30"
                }`}
              >
                {t(mt.label)}
              </button>
            ))}
          </div>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t("altar.title_placeholder")}
            className="font-body text-base mb-2 bg-background"
          />
          <Input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={t("altar.content_placeholder")}
            className="font-body text-sm mb-3 bg-background"
          />
          <button
            onClick={addMemory}
            disabled={!newTitle.trim()}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium disabled:opacity-40 hover:bg-primary/90 transition-colors"
          >
            {t("altar.save")}
          </button>
        </div>
      )}

      {/* Memories list */}
      <div className="grid gap-3 max-w-lg mx-auto">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-8 w-8 text-primary/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-body">{t("altar.empty")}</p>
          </div>
        )}
        {filtered.map((m) => {
          const typeConfig = memoryTypes.find((mt) => mt.key === m.memory_type);
          const Icon = typeConfig?.icon || Star;
          return (
            <div key={m.id} className="p-4 rounded-2xl border border-border/30 bg-card/50 group">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary/60 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base text-foreground">{m.title}</h4>
                  {m.content && (
                    <p className="text-sm font-body text-muted-foreground mt-1 leading-relaxed">{m.content}</p>
                  )}
                  <p className="text-xs text-muted-foreground/40 font-body mt-2">
                    {new Date(m.created_at).toLocaleDateString()}
                  </p>
                </div>
                {m.author_id === user?.id && (
                  <button
                    onClick={() => deleteMemory(m.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryAltar;
