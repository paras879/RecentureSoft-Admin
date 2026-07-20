"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Move, GripVertical, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function BannerCustomizer({ content, onChange }) {
  const config = content?.bannerConfig || {};
  const hero = content?.crmHero || content?.hero || {};

  const set = (path, value) => {
    const newConfig = { ...config, [path]: value };
    onChange({ ...content, bannerConfig: newConfig });
  };

  const toggleBanner = () => set("enabled", !config.enabled);
  const toggleButtons = () => set("buttonsEnabled", !config.buttonsEnabled);

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <BannerPreviewPanel config={config} hero={hero} content={content} />

      {/* Banner Enable/Disable */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Banner Visibility</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Show or hide the banner on this page</p>
        </div>
        <button
          type="button"
          onClick={toggleBanner}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${config.enabled !== false ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${config.enabled !== false ? 'translate-x-7' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Position & Order */}
      <PositionOrderControl config={config} set={set} />

      {/* Banner Image */}
      <BannerImageControl config={config} hero={hero} set={set} onChange={onChange} content={content} />

      {/* Spacing Control */}
      <SpacingControl config={config} set={set} label="Banner Spacing" prefix="spacing" />

      {/* Button Settings */}
      <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">CTA Buttons</p>
          <button
            type="button"
            onClick={toggleButtons}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${config.buttonsEnabled !== false ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${config.buttonsEnabled !== false ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>

        {config.buttonsEnabled !== false && (
          <>
            <ButtonAlignmentControl config={config} set={set} />
            <ButtonStyleControl config={config} set={set} />
            <ButtonSpacingControl config={config} set={set} />
            <ButtonListControl config={config} set={set} content={content} onChange={onChange} />
          </>
        )}
      </div>
    </div>
  );
}

function BannerPreviewPanel({ config, hero, content }) {
  if (config.enabled === false) {
    return (
      <div className="p-8 bg-slate-100 dark:bg-slate-900/40 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400">
        <EyeOff className="w-8 h-8" />
        <p className="text-sm font-medium">Banner is hidden</p>
      </div>
    );
  }

  const position = config.position || "top";
  const order = config.order || 1;
  const margin = config.spacing?.margin || { top: 0, bottom: 0, left: 0, right: 0 };
  const padding = config.spacing?.padding || { top: 0, bottom: 0, left: 0, right: 0 };

  const btnConfig = config.buttons || {};
  const btnAlign = btnConfig.alignment || "center";
  const buttonSpacing = config.buttonSpacing || { margin: { top: 0, bottom: 0, left: 0, right: 0 }, gap: 12 };
  const buttonsEnabled = config.buttonsEnabled !== false;
  const buttons = content?.crmHero?.buttons || content?.buttons || config.buttons?.items || [];

  const bannerImage = config.imageUrl || hero?.bannerImage || hero?.desktopBanner || hero?.banner || "";

  const previewStyle = {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
    paddingTop: padding.top,
    paddingBottom: padding.bottom,
    paddingLeft: padding.left,
    paddingRight: padding.right,
  };

  const btnStyle = {
    width: btnConfig.width || "auto",
    height: btnConfig.height || "auto",
    paddingTop: btnConfig.padding?.y || 12,
    paddingBottom: btnConfig.padding?.y || 12,
    paddingLeft: btnConfig.padding?.x || 24,
    paddingRight: btnConfig.padding?.x || 24,
    borderRadius: btnConfig.borderRadius ?? 8,
    fontSize: btnConfig.fontSize || 16,
    backgroundColor: btnConfig.bgColor || "#3b82f6",
    color: btnConfig.textColor || "#ffffff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm">
      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/80 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Eye className="w-3.5 h-3.5 text-cyan-500" />
        Live Preview — Position: {position}, Order: {order}
      </div>
      <div className="p-6 flex items-center justify-center min-h-[200px] bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div style={previewStyle} className="w-full max-w-2xl">
          {bannerImage && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img src={bannerImage} alt="Banner preview" className="w-full h-auto object-cover rounded-lg" style={{ maxHeight: 200 }} />
            </div>
          )}
          <div className="text-center">
            {hero?.badge && <span className="inline-block px-3 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold rounded-full mb-3">{hero.badge}</span>}
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{hero?.title || hero?.heroTitle || "Page Title"}</h2>
            {hero?.highlight && <p className="text-lg text-cyan-600 dark:text-cyan-400 font-semibold mt-1">{hero.highlight}</p>}
            {hero?.heroSubtitle && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{hero.heroSubtitle}</p>}
          </div>

          {buttonsEnabled && buttons.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3" style={{ justifyContent: btnAlign, gap: buttonSpacing.gap || 12, marginTop: buttonSpacing.margin?.top || 0, marginBottom: buttonSpacing.margin?.bottom || 0 }}>
              {buttons.map((btn, i) => (
                <button key={i} style={btnStyle}>{btn.text || "Button"}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PositionOrderControl({ config, set }) {
  return (
    <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Position & Order</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Banner Position</label>
          <select
            value={config.position || "top"}
            onChange={(e) => set("position", e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="top">Top (Before all content)</option>
            <option value="below-hero">Below Hero</option>
            <option value="middle">Middle (Between sections)</option>
            <option value="bottom">Bottom (After all content)</option>
            <option value="custom">Custom Order</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Order</label>
          <input
            type="number"
            min="1"
            max="100"
            value={config.order || 1}
            onChange={(e) => set("order", parseInt(e.target.value) || 1)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
          {config.position === "custom" && (
            <p className="text-[10px] text-amber-500">Lower numbers appear first. Drag-and-drop coming soon.</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
        <GripVertical className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-500">Drag to reorder sections (future: full drag-and-drop support)</span>
      </div>
    </div>
  );
}

function BannerImageControl({ config, hero, set, onChange, content }) {
  const currentUrl = config.imageUrl || hero?.bannerImage || hero?.desktopBanner || hero?.banner || "";
  return (
    <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Banner Image Settings</p>
      
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Hero / Banner Image</label>
        <ImageUploader
          value={currentUrl}
          onChange={(url) => {
            set("imageUrl", url);
            if (!hero?.bannerImage && !hero?.desktopBanner) {
              const newHero = { ...hero, bannerImage: url };
              onChange({ ...content, crmHero: newHero, hero: newHero, bannerConfig: { ...config, imageUrl: url } });
            }
          }}
        />
      </div>
      {currentUrl && (
        <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
          <img src={currentUrl} alt="Preview" className="w-16 h-10 object-cover rounded border border-slate-200 dark:border-slate-700" />
          <span className="text-[10px] text-slate-500 truncate flex-1">{currentUrl}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Object Fit (Cropping)</label>
          <select
            value={config.objectFit || "cover"}
            onChange={(e) => set("objectFit", e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="cover">Cover (Fills area, may crop edges)</option>
            <option value="contain">Contain (Shows full image, no cropping)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overlay Opacity</label>
            <span className="text-xs text-slate-500">{config.opacity !== undefined ? config.opacity : 70}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.opacity !== undefined ? config.opacity : 70}
            onChange={(e) => set("opacity", parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
          />
          <p className="text-[10px] text-slate-500">Controls the dark overlay on the banner</p>
        </div>
      </div>
    </div>
  );
}

function SpacingControl({ config, set, label, prefix }) {
  const spacing = config[prefix] || {};
  const margin = spacing.margin || { top: 0, bottom: 0, left: 0, right: 0 };
  const padding = spacing.padding || { top: 0, bottom: 0, left: 0, right: 0 };

  const updateMargin = (side, val) => {
    const newSpacing = { ...spacing, margin: { ...margin, [side]: parseInt(val) || 0 } };
    set(prefix, newSpacing);
  };
  const updatePadding = (side, val) => {
    const newSpacing = { ...spacing, padding: { ...padding, [side]: parseInt(val) || 0 } };
    set(prefix, newSpacing);
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Margin (px)</p>
          {["top", "bottom", "left", "right"].map((side) => (
            <div key={side} className="flex items-center gap-2">
              <label className="text-xs text-slate-500 w-12 capitalize">{side}</label>
              <input
                type="number"
                value={margin[side] || 0}
                onChange={(e) => updateMargin(side, e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                placeholder="0"
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Padding (px)</p>
          {["top", "bottom", "left", "right"].map((side) => (
            <div key={side} className="flex items-center gap-2">
              <label className="text-xs text-slate-500 w-12 capitalize">{side}</label>
              <input
                type="number"
                value={padding[side] || 0}
                onChange={(e) => updatePadding(side, e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ButtonAlignmentControl({ config, set }) {
  const btnConfig = config.buttons || {};
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Buttons Alignment</label>
      <div className="flex gap-1">
        {[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => set("buttons", { ...btnConfig, alignment: opt.value })}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${(btnConfig.alignment || "center") === opt.value ? "bg-cyan-500 text-white shadow-sm" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ButtonStyleControl({ config, set }) {
  const btnConfig = config.buttons || {};

  const updateBtn = (field, value) => {
    set("buttons", { ...btnConfig, [field]: value });
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Button Style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Width</label>
          <input
            type="text"
            value={btnConfig.width || "auto"}
            onChange={(e) => updateBtn("width", e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            placeholder="auto / 200px / 100%"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Height</label>
          <input
            type="text"
            value={btnConfig.height || "auto"}
            onChange={(e) => updateBtn("height", e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            placeholder="auto / 48px"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Border Radius (px)</label>
          <input
            type="number"
            value={btnConfig.borderRadius ?? 8}
            onChange={(e) => updateBtn("borderRadius", parseInt(e.target.value) || 0)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Font Size (px)</label>
          <input
            type="number"
            value={btnConfig.fontSize || 16}
            onChange={(e) => updateBtn("fontSize", parseInt(e.target.value) || 16)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Padding X (px)</label>
          <input
            type="number"
            value={btnConfig.padding?.x || 24}
            onChange={(e) => updateBtn("padding", { ...btnConfig.padding, x: parseInt(e.target.value) || 24 })}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Padding Y (px)</label>
          <input
            type="number"
            value={btnConfig.padding?.y || 12}
            onChange={(e) => updateBtn("padding", { ...btnConfig.padding, y: parseInt(e.target.value) || 12 })}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Background Color</label>
          <div className="flex gap-1.5 items-center">
            <input
              type="color"
              value={btnConfig.bgColor || "#3b82f6"}
              onChange={(e) => updateBtn("bgColor", e.target.value)}
              className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 bg-transparent shrink-0 cursor-pointer"
            />
            <input
              type="text"
              value={btnConfig.bgColor || "#3b82f6"}
              onChange={(e) => updateBtn("bgColor", e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Text Color</label>
          <div className="flex gap-1.5 items-center">
            <input
              type="color"
              value={btnConfig.textColor || "#ffffff"}
              onChange={(e) => updateBtn("textColor", e.target.value)}
              className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 bg-transparent shrink-0 cursor-pointer"
            />
            <input
              type="text"
              value={btnConfig.textColor || "#ffffff"}
              onChange={(e) => updateBtn("textColor", e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonSpacingControl({ config, set }) {
  const btnSpacing = config.buttonSpacing || {};
  const margin = btnSpacing.margin || { top: 0, bottom: 0, left: 0, right: 0 };

  const updateMargin = (side, val) => {
    set("buttonSpacing", { ...btnSpacing, margin: { ...margin, [side]: parseInt(val) || 0 } });
  };

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Button Spacing</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Gap Between Buttons (px)</label>
          <input
            type="number"
            value={btnSpacing.gap || 12}
            onChange={(e) => set("buttonSpacing", { ...btnSpacing, gap: parseInt(e.target.value) || 12 })}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Top Margin (px)</label>
          <input
            type="number"
            value={margin.top || 0}
            onChange={(e) => updateMargin("top", e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500">Bottom Margin (px)</label>
          <input
            type="number"
            value={margin.bottom || 0}
            onChange={(e) => updateMargin("bottom", e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function ButtonListControl({ config, set, content, onChange }) {
  const buttons = config.buttons?.items || content?.crmHero?.buttons || [];
  const btnConfig = config.buttons || {};

  const updateButtons = (newButtons) => {
    set("buttons", { ...btnConfig, items: newButtons });
    if (content?.crmHero) {
      onChange({ ...content, crmHero: { ...content.crmHero, buttons: newButtons } });
    }
  };

  const addButton = () => {
    const newBtns = [...buttons, { text: "Click Here", url: "#", bgColor: btnConfig.bgColor || "#3b82f6", textColor: btnConfig.textColor || "#ffffff" }];
    updateButtons(newBtns);
  };

  const updateButton = (idx, field, value) => {
    const newBtns = buttons.map((b, i) => (i === idx ? { ...b, [field]: value } : b));
    updateButtons(newBtns);
  };

  const removeButton = (idx) => {
    updateButtons(buttons.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Button List</p>
        <button type="button" onClick={addButton} className="flex items-center gap-1 px-2.5 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg text-[10px] font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-500/20 transition-colors">
          <Plus className="w-3 h-3" /> Add Button
        </button>
      </div>
      {buttons.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">No buttons configured. Add one above.</p>
      ) : (
        <div className="space-y-2">
          {buttons.map((btn, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800 relative group">
              <button type="button" onClick={() => removeButton(idx)} className="absolute top-1.5 right-1.5 text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="grid grid-cols-2 gap-2 flex-1 pr-6">
                <input
                  type="text"
                  value={btn.text || ""}
                  onChange={(e) => updateButton(idx, "text", e.target.value)}
                  placeholder="Button Text"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={btn.url || ""}
                  onChange={(e) => updateButton(idx, "url", e.target.value)}
                  placeholder="Link URL"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
