import { useMemo, useState } from 'react';
import type { UserPath } from '@/constants/paths';
import type { AssetSelection, EventInputs, MarketInput } from '@/engine/valuation';
import { valuationEngine } from '@/engine/valuation';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { EventBasicsStep } from './EventBasicsStep';
import { MarketStep } from './MarketStep';
import { UnpluggedAssetsStep } from './UnpluggedAssetsStep';
import { ResultsDashboard } from './ResultsDashboard';
import { CrossSell } from './CrossSell';
import { FAQ } from './FAQ';
import { Glossary } from './Glossary';
import { Footer } from './Footer';

interface Props {
  path: UserPath;
  onBack: () => void;
}

const DEFAULT_EVENT: EventInputs = {
  name: '',
  venueType: 'outdoor_festival',
  capacity: 10000,
  attendance: 7500,
  durationHours: 8,
  editionNumber: 1,
  totalSponsors: 5,
  hasWaitlist: false,
};

const DEFAULT_MARKET: MarketInput = {
  dma: 'Other',
};

export function ValuationConsultant({ path, onBack }: Props) {
  const [event, setEvent] = useState<EventInputs>(DEFAULT_EVENT);
  const [market, setMarket] = useState<MarketInput>(DEFAULT_MARKET);
  const [assets, setAssets] = useState<AssetSelection[]>([]);
  const [eventComplete, setEventComplete] = useState(false);
  const [marketComplete, setMarketComplete] = useState(false);

  const results = useMemo(() => {
    if (!eventComplete || assets.length === 0) return null;
    return valuationEngine({ event, market, assets });
  }, [event, market, assets, eventComplete]);

  const runningTotal = useAnimatedNumber(results?.finalValue ?? 0, 600);

  return (
    <>
      {/* Running total header */}
      {eventComplete && (
        <div className="running-total">
          <span className="running-total__label">Estimated Valuation</span>
          <span className="running-total__value">
            ${runningTotal.toLocaleString()}
          </span>
        </div>
      )}

      <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
        {/* Back button */}
        <button className="btn btn--back" onClick={onBack}>
          &larr; Back
        </button>

        {/* Atledi welcome */}
        <div className="callout callout--cta" style={{ marginTop: 48, marginBottom: 32 }}>
          <strong>Atledi says:</strong>{' '}
          {path === 'property'
            ? "Welcome. I\u2019m Atledi, your valuation consultant. Let\u2019s build your sponsorship package together \u2014 starting with the basics about your event."
            : "Welcome. I\u2019m Atledi, your valuation consultant. Let\u2019s evaluate this sponsorship opportunity together \u2014 starting with what we know about the event."}
        </div>

        {/* Step 1: Event Basics */}
        <EventBasicsStep
          event={event}
          onChange={setEvent}
          onComplete={() => setEventComplete(true)}
          isComplete={eventComplete}
        />

        {/* Step 2: Markets — shown after event basics */}
        {eventComplete && (
          <MarketStep
            market={market}
            onChange={setMarket}
            onComplete={() => setMarketComplete(true)}
            isComplete={marketComplete}
          />
        )}

        {/* Step 4: Unplugged Assets — shown after market */}
        {marketComplete && (
          <UnpluggedAssetsStep
            assets={assets}
            onChange={setAssets}
            durationHours={event.durationHours}
            attendance={event.attendance}
          />
        )}

        {/* Results — shown when assets are selected */}
        {results && (
          <>
            <ResultsDashboard results={results} path={path} />

            <FAQ />
            <Glossary />
          </>
        )}

        <CrossSell />
        <Footer />
      </div>
    </>
  );
}
