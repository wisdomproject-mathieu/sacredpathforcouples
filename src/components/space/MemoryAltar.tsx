import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Bookmark, Heart, Star, Sparkles, Plus, Trash2 } from "lucide-react";

const memoryTypes = [
  { key: "all", icon: Star, label: "altar.all" },
  { key: "ritual", icon: Bookmark, label: "altar.ritual" },
  { key: "vow", icon: Heart, label: "altar.vow" },
  { key: "moment", icon: Sparkles, label: "altar.moment" },
];

interface AltarItem {
  id: string;
  item_type: string;
  title: string;
  note: string | null;
  user_id: string;
  created_at: string;
}

interface Props {
  coupleId?: string;
}

const MemoryAltar = ({ coupleId }: Props) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const isPreview = !coupleId;
  const [items, setItems] = useState<AltarItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newType, setNewType] = useState("moment");

  useEffect(() => {
    if (!coupleId) return;
    const load = async () => {
      const { data } = await supabase
        .from("altar_items")
        .select("*")
        .eq("couple_id", coupleId)
        .order("created_at", { ascending: false });
      if (data) setItems(data);
    };
    load();
  }, [coupleId]);

  const addItem = async () => {
    if (!newTitle.trim() || !user || !coupleId) return;
    const { data } = await supabase.from("altar_items").insert({
      couple_id: coupleId,
      user_id: user.id,
      item_type: newType,
      title: newTitle.trim(),
      note: newNote.trim() || null,
    }).select().single();
    if (data) {
      setItems((prev) => [data, ...prev]);
      setNewTitle(""); setNewNote(""); setShowAdd(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!coupleId) return;
    await supabase.from("altar_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.item_type === filter);

  return (
    <div className="px-5 py-6 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">{t("altar.title")}</h3>
        <p className="text-muted-foreground font-body text-base md:text-lg max-w-md mx-auto">{t("altar.subtitle")}</p>
      </div>

      <div className="flex items-center justify-between mb-5">
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
          onClick={() => !isPreview && setShowAdd(!showAdd)}
          disabled={isPreview}
          className="h-9 w-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center hover:bg-primary/25 transition-colors shrink-0 ml-2 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {isPreview && (
        <div className="mb-5 rounded-2xl border border-border/30 bg-background/45 p-4 text-sm leading-6 text-muted-foreground">
          Preview mode is active. Connect with your partner to save shared altar moments.
        </div>
      )}

      {showAdd && (
        <div className="mb-6 p-4 rounded-2xl border border-primary/20 bg-primary/5 animate-fade-in">
          <div className="flex gap-1.5 mb-3">
            {memoryTypes.filter((m) => m.key !== "all").map((mt) => (
              <button
                key={mt.key}
                onClick={() => setNewType(mt.key)}
                className={`px-3 py-1 rounded-full text-xs font-body border transition-all ${
                  newType === mt.key ? "bg-primary/15 text-primary border-primary/30" : "text-muted-foreground border-border/30"
                }`}
              >
                {t(mt.label)}
              </button>
            ))}
          </div>
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={t("altar.title_placeholder")} className="font-body text-base mb-2 bg-background" />
          <Input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder={t("altar.content_placeholder")} className="font-body text-sm mb-3 bg-background" />
          <button onClick={addItem} disabled={!newTitle.trim()} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium disabled:opacity-40 hover:bg-primary/90 transition-colors">
            {t("altar.save")}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-8 w-8 text-primary/20 mx-auto mb-3" />
            <p className="text-base text-muted-foreground font-body">{isPreview ? "No shared altar yet in preview mode." : t("altar.empty")}</p>
          </div>
        )}
        {filtered.map((item) => {
          const typeConfig = memoryTypes.find((mt) => mt.key === item.item_type);
          const Icon = typeConfig?.icon || Star;
          return (
            <div key={item.id} className="p-4 rounded-2xl border border-border/30 bg-card/50 group">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary/60 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base md:text-lg text-foreground">{item.title}</h4>
                  {item.note && <p className="text-sm font-body text-muted-foreground mt-1 leading-relaxed">{item.note}</p>}
                  <p className="text-xs text-muted-foreground/40 font-body mt-2">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                {item.user_id === user?.id && (
                  <button onClick={() => deleteItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
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
