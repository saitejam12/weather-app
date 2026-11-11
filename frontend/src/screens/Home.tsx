// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Separator, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, Edit } = Icons;

const PRODUCT = "weather app";
const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

const TODAY = "wednesday, 11 november 2026";

const CITIES = [
  { id: "london-gb", name: "London", state: "England", country: "GB", lat: 51.5073, lon: -0.1276 },
  { id: "london-ca", name: "London", state: "Ontario", country: "CA", lat: 42.9836, lon: -81.2497 },
  { id: "london-us", name: "London", state: "Kentucky", country: "US", lat: 37.1289, lon: -84.0833 },
  { id: "paris-fr", name: "Paris", state: "Île-de-France", country: "FR", lat: 48.8566, lon: 2.3522 },
  { id: "paris-us", name: "Paris", state: "Texas", country: "US", lat: 33.6609, lon: -95.5555, flaky: "rate" },
  { id: "reykjavik-is", name: "Reykjavík", state: "Capital Region", country: "IS", lat: 64.1466, lon: -21.9426 },
  { id: "kathmandu-np", name: "Kathmandu", state: "Bagmati Province", country: "NP", lat: 27.7172, lon: 85.324, flaky: "service" },
  { id: "valencia-es", name: "Valencia", state: "Valencian Community", country: "ES", lat: 39.4699, lon: -0.3763 },
];

const WEATHER = {
  "london-gb": { temp_c: 12, feels_like_c: 10, humidity: 72, wind: null, condition: "Light rain", art: "rain", updated: "14:20, 11 Nov 2026" },
  "london-ca": { temp_c: 3, feels_like_c: -1, humidity: 64, wind: "17 km/h NW", condition: "Overcast clouds", art: "cloud", updated: "09:20, 11 Nov 2026" },
  "london-us": { temp_c: 9, feels_like_c: 8, humidity: 55, wind: "11 km/h SW", condition: "Broken clouds", art: "cloud", updated: "09:20, 11 Nov 2026" },
  "paris-fr": { temp_c: 11, feels_like_c: 9, humidity: 77, wind: "13 km/h W", condition: "Light rain", art: "rain", updated: "15:20, 11 Nov 2026" },
  "paris-us": { temp_c: 17, feels_like_c: 17, humidity: 48, wind: "19 km/h S", condition: "Clear sky", art: "sun", updated: "08:20, 11 Nov 2026" },
  "reykjavik-is": { temp_c: -2, feels_like_c: -8, humidity: 81, wind: "34 km/h NE", condition: "Light snow", art: "snow", updated: "14:20, 11 Nov 2026" },
  "kathmandu-np": { temp_c: 19, feels_like_c: 18, humidity: 38, wind: "6 km/h E", condition: "Clear sky", art: "sun", updated: "19:35, 11 Nov 2026" },
  "valencia-es": { temp_c: 21, feels_like_c: 21, humidity: 61, wind: "9 km/h SE", condition: "Few clouds", art: "sun", updated: "15:20, 11 Nov 2026" },
};

const ERROR_COPY = {
  service: "Weather data is temporarily unavailable. Please try again in a moment.",
  rate: "We’ve reached the weather service’s request limit just now. Weather data is temporarily unavailable — please try again in a few minutes.",
};

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const cityLabel = (c) => `${c.name}, ${c.state}, ${c.country}`;

export default function Screen() {
  const [query, setQuery] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [phase, setPhase] = React.useState("idle"); // idle | searching | choose | loading | ready | not_found | error
  const [matches, setMatches] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [weather, setWeather] = React.useState(null);
  const [errorKind, setErrorKind] = React.useState(null);
  const [unit, setUnit] = React.useState("C");
  const [emptySubmit, setEmptySubmit] = React.useState(false);
  const [attempt, setAttempt] = React.useState(0);
  const tried = React.useRef({});
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (phase !== "searching") return undefined;
    const t = setTimeout(() => {
      const k = norm(term);
      const found = CITIES.filter((c) => norm(c.name).startsWith(k));
      if (found.length === 0) {
        setMatches([]);
        setPhase("not_found");
      } else if (found.length === 1) {
        setMatches(found);
        setSelected(found[0]);
        setPhase("loading");
      } else {
        setMatches(found);
        setPhase("choose");
      }
    }, 650);
    return () => clearTimeout(t);
  }, [phase, term]);

  React.useEffect(() => {
    if (phase !== "loading" || !selected) return undefined;
    const t = setTimeout(() => {
      const n = (tried.current[selected.id] || 0) + 1;
      tried.current[selected.id] = n;
      if (selected.flaky && n === 1) {
        setErrorKind(selected.flaky);
        setPhase("error");
        return;
      }
      setWeather(WEATHER[selected.id]);
      setErrorKind(null);
      setPhase("ready");
    }, 850);
    return () => clearTimeout(t);
  }, [phase, selected, attempt]);

  const temp = (c) => (unit === "C" ? `${Math.round(c)}°C` : `${Math.round(c * 9 / 5 + 32)}°F`);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setEmptySubmit(true);
      setPhase("idle");
      setMatches([]);
      setSelected(null);
      setWeather(null);
      setErrorKind(null);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setEmptySubmit(false);
    setTerm(query.trim());
    setMatches([]);
    setSelected(null);
    setWeather(null);
    setErrorKind(null);
    setPhase("searching");
  };

  const pickCity = (c) => {
    setSelected(c);
    setWeather(null);
    setErrorKind(null);
    setPhase("loading");
  };

  const retry = () => {
    setErrorKind(null);
    setAttempt((a) => a + 1);
    setPhase("loading");
  };

  const css = `
.atrium-focus:focus-visible{outline:2px solid ${brand.primaryColor};outline-offset:3px;}
.atrium-rise{animation:atrium-rise .45s ease-out both;}
@keyframes atrium-rise{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.atrium-breathe{animation:atrium-breathe 1.6s ease-in-out infinite;}
@keyframes atrium-breathe{0%,100%{opacity:.3;transform:scale(.8);}50%{opacity:1;transform:scale(1);}}
@media (prefers-reduced-motion: reduce){.atrium-rise,.atrium-breathe{animation:none;}}
`;

  const Art = ({ kind }) => (
    <svg viewBox="0 0 80 80" className="h-20 w-20" role="img" aria-label={weather ? `${weather.condition} icon` : "weather icon"}>
      {kind === "sun" && (
        <g fill="none" stroke={brand.accentColor} strokeWidth="2.5" strokeLinecap="round">
          <circle cx="40" cy="40" r="14" />
          <path d="M40 12v-6M40 74v-6M12 40H6M74 40h-6M20 20l-4-4M64 64l-4-4M60 20l4-4M16 64l4-4" />
        </g>
      )}
      {kind === "cloud" && (
        <g fill="none" stroke={brand.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 52h30a12 12 0 0 0 .6-24 17 17 0 0 0-32 4A11 11 0 0 0 24 52Z" />
        </g>
      )}
      {kind === "rain" && (
        <g fill="none" stroke={brand.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 46h30a12 12 0 0 0 .6-24 17 17 0 0 0-32 4A11 11 0 0 0 24 46Z" />
          <path d="M30 56l-3 10M42 56l-3 10M54 56l-3 10" />
        </g>
      )}
      {kind === "snow" && (
        <g fill="none" stroke={brand.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 46h30a12 12 0 0 0 .6-24 17 17 0 0 0-32 4A11 11 0 0 0 24 46Z" />
          <path d="M30 58v8M26 62h8M50 58v8M46 62h8" />
        </g>
      )}
    </svg>
  );

  const details = weather
    ? [
        { wf: "b-7-0", label: "Humidity", value: `${weather.humidity}%` },
        { wf: "b-7-1", label: "Wind", value: weather.wind },
        { wf: "b-7-2", label: "Feels like", value: temp(weather.feels_like_c) },
      ]
    : [];

  return (
    <div className="space-y-8" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{css}</style>

      <header data-wf="b-0-0" className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl italic" style={{ fontFamily: brand.fontHeading }}>Current weather</h1>
          <p className="mt-2 text-sm lowercase" style={{ color: brand.neutralColor }}>
            one city at a time, from the {PRODUCT}
          </p>
        </div>
        <p className="rounded-full px-4 py-2 text-xs lowercase tabular-nums" style={{ backgroundColor: tint(8) }}>{TODAY}</p>
      </header>

      <form onSubmit={onSubmit} className="grid grid-cols-12 items-end gap-4">
        <div data-wf="b-1-0" className="col-span-12 sm:col-span-7">
          <Label htmlFor="city-search" className="mb-2 block text-xs lowercase" style={{ color: brand.neutralColor }}>
            city name
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2" aria-hidden="true" style={{ color: brand.neutralColor }}>
              <Icons.Search className="h-5 w-5" />
            </span>
            <Input
              id="city-search"
              ref={inputRef}
              type="search"
              value={query}
              autoComplete="off"
              onChange={(e) => { setQuery(e.target.value); if (emptySubmit) setEmptySubmit(false); }}
              placeholder="Search a city, e.g. London"
              aria-describedby="search-help"
              aria-invalid={emptySubmit ? "true" : undefined}
              className="atrium-focus h-14 w-full border-0 pl-12 pr-5 text-base"
              style={{ backgroundColor: tint(8), borderRadius: "999px", color: brand.primaryColor }}
            />
          </div>
        </div>

        <div className="col-span-7 sm:col-span-2">
          <Button
            data-wf="b-1-1"
            type="submit"
            className="atrium-focus h-14 w-full border-0 text-base"
            style={{ backgroundColor: brand.primaryColor, color: brand.backgroundColor, borderRadius: "999px" }}
          >
            Search
          </Button>
        </div>

        <div data-wf="b-1-2" className="col-span-5 sm:col-span-3">
          <span id="units-label" className="mb-2 block text-xs lowercase" style={{ color: brand.neutralColor }}>Units</span>
          <div role="group" aria-labelledby="units-label" className="flex h-14 items-center gap-1 p-1" style={{ backgroundColor: tint(8), borderRadius: "999px" }}>
            {[["C", "°C", "i-1-2-0"], ["F", "°F", "i-1-2-1"]].map(([key, label, wf]) => {
              const on = unit === key;
              return (
                <button
                  key={key}
                  data-wf={wf}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setUnit(key)}
                  className="atrium-focus flex h-12 flex-1 items-center justify-center gap-1 text-sm tabular-nums transition-colors"
                  style={{
                    borderRadius: "999px",
                    backgroundColor: on ? brand.primaryColor : "transparent",
                    color: on ? brand.backgroundColor : brand.primaryColor,
                  }}
                >
                  {on && <Icons.Check className="h-4 w-4" aria-hidden="true" />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      <div aria-live="polite" className="space-y-8">
        {(phase === "idle") && (
          <section data-wf="b-2-0" className="px-6 py-6 sm:px-8" style={{ backgroundColor: tint(6), borderRadius: 24 }}>
            <p className="flex items-center gap-3 text-base" role={emptySubmit ? "alert" : undefined} style={{ fontWeight: emptySubmit ? 600 : 400 }}>
              {emptySubmit && <Icons.AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />}
              <span>{emptySubmit ? "Please enter a city name to search." : "Please enter a city name to search."}</span>
            </p>
            <p id="search-help" className="mt-2 text-sm lowercase" style={{ color: brand.neutralColor }}>
              try london, paris, reykjavík or kathmandu — no account, nothing to sign up for.
            </p>
          </section>
        )}

        {(phase === "searching" || phase === "choose") && (
          <section data-wf="b-3-0" className="atrium-rise px-6 pb-8 pt-8 sm:px-8" style={{ backgroundColor: tint(6), borderRadius: 24 }}>
            {phase === "searching" ? (
              <p className="flex items-center gap-3 text-base lowercase" style={{ color: brand.neutralColor }}>
                <span className="atrium-breathe inline-block h-3 w-3 rounded-full" style={{ backgroundColor: brand.accentColor }} aria-hidden="true" />
                looking for cities called “{term}”…
              </p>
            ) : (
              <>
                <h2 className="text-xl italic" style={{ fontFamily: brand.fontHeading }}>
                  <span className="tabular-nums">{matches.length}</span> cities match “{term}” — pick the one you meant
                </h2>
                <ul className="mt-5 space-y-3">
                  {matches.map((c, i) => (
                    <li key={c.id}>
                      <button
                        data-wf={`i-3-0-${i}`}
                        type="button"
                        onClick={() => pickCity(c)}
                        className="atrium-focus flex w-full items-center gap-4 px-6 py-4 text-left transition-colors"
                        style={{ backgroundColor: tint(4), borderRadius: "999px" }}
                      >
                        <span className="flex-1">
                          <span className="block text-base">{cityLabel(c)}</span>
                          <span className="block text-xs lowercase tabular-nums" style={{ color: brand.neutralColor }}>
                            {c.lat.toFixed(2)}°, {c.lon.toFixed(2)}°
                          </span>
                        </span>
                        <Icons.ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {phase === "loading" && selected && (
          <section data-wf="b-4-0" className="flex items-center gap-4 px-6 py-8 sm:px-8" style={{ backgroundColor: tint(6), borderRadius: "150px 150px 24px 24px" }}>
            <span className="atrium-breathe inline-block h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: brand.accentColor }} aria-hidden="true" />
            <p className="text-base lowercase" style={{ color: brand.neutralColor }}>
              Loading current weather for {cityLabel(selected)}…
            </p>
          </section>
        )}

        {phase === "ready" && weather && selected && (
          <>
            <section data-wf="b-5-0" className="atrium-rise px-6 pb-10 pt-12 sm:px-10" style={{ backgroundColor: tint(6), borderRadius: "150px 150px 24px 24px" }}>
              <h2 className="text-center text-2xl italic" style={{ fontFamily: brand.fontHeading }}>{cityLabel(selected)}</h2>
              <p className="mt-1 text-center text-xs lowercase tabular-nums" style={{ color: brand.neutralColor }}>
                {selected.lat.toFixed(2)}°, {selected.lon.toFixed(2)}° · current conditions only
              </p>

              <div className="mt-8 grid grid-cols-12 items-center gap-6">
                <div data-wf="b-6-0" className="col-span-12 flex justify-center px-4 pb-4 pt-6 sm:col-span-3" style={{ backgroundColor: tint(8), borderRadius: "110px 110px 24px 24px" }}>
                  <Art kind={weather.art} />
                </div>
                <div data-wf="b-6-1" className="col-span-12 text-center sm:col-span-9 sm:text-left">
                  <p className="text-5xl tabular-nums sm:text-6xl" style={{ fontFamily: brand.fontHeading }}>
                    {temp(weather.temp_c)} <span className="text-3xl italic sm:text-4xl">— {weather.condition}</span>
                  </p>
                  <p className="mt-3 text-sm lowercase tabular-nums" style={{ color: brand.neutralColor }}>
                    updated {weather.updated.toLowerCase()}
                  </p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {details.map((d) => (
                <section key={d.wf} data-wf={d.wf} className="px-6 pb-6 pt-10 text-center" style={{ backgroundColor: tint(6), borderRadius: "110px 110px 24px 24px" }}>
                  {d.value ? (
                    <p className="text-3xl tabular-nums" style={{ fontFamily: brand.fontHeading }}>{d.value}</p>
                  ) : (
                    <p className="flex items-center justify-center gap-2 text-xl italic" style={{ fontFamily: brand.fontHeading, color: brand.neutralColor }}>
                      <Icons.AlertCircle className="h-5 w-5" aria-hidden="true" />
                      unavailable
                    </p>
                  )}
                  <p className="mt-2 text-xs lowercase" style={{ color: brand.neutralColor }}>
                    {d.label}{!d.value && " — not reported for this city"}
                  </p>
                </section>
              ))}
            </div>
          </>
        )}

        {phase === "not_found" && (
          <div data-wf="b-8-0" className="atrium-rise px-6 py-10 sm:px-10" style={{ backgroundColor: tint(6), borderRadius: "150px 150px 24px 24px" }}>
            <Empty
              title="No city by that name"
              description={`We couldn’t find a city called “${term}”. Try a different spelling or another name.`}
              action={
                <Button
                  type="button"
                  onClick={() => { if (inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }}
                  className="atrium-focus h-12 border-0 px-6"
                  style={{ backgroundColor: brand.primaryColor, color: brand.backgroundColor, borderRadius: "999px" }}
                >
                  Edit your search
                </Button>
              }
            />
          </div>
        )}

        {phase === "error" && (
          <section className="atrium-rise grid grid-cols-12 items-center gap-5 px-6 py-8 sm:px-8" style={{ backgroundColor: tint(10), borderRadius: 24 }}>
            <div data-wf="b-9-0" className="col-span-12 sm:col-span-9">
              <p className="flex items-start gap-3 text-base" role="alert">
                <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
                <span>{ERROR_COPY[errorKind] || ERROR_COPY.service}</span>
              </p>
              <p className="mt-2 pl-8 text-sm lowercase" style={{ color: brand.neutralColor }}>
                your search for “{term}” is still here — nothing lost.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-3">
              <Button
                data-wf="b-9-1"
                type="button"
                onClick={retry}
                className="atrium-focus h-14 w-full border-0 text-base"
                style={{ backgroundColor: brand.primaryColor, color: brand.backgroundColor, borderRadius: "999px" }}
              >
                Retry
              </Button>
            </div>
          </section>
        )}
      </div>

      <div style={{ color: tint(20) }}>
        <Separator />
      </div>
      <p data-wf="b-10-0" className="text-xs lowercase" style={{ color: brand.neutralColor }}>
        Current weather data from OpenWeatherMap. Free to use — no account needed.
      </p>
    </div>
  );
}
