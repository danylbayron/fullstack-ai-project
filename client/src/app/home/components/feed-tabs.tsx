"use client";

import { ArticleFeedType } from "../types/article";

interface FeedTabsProps {
  activeFeed: ArticleFeedType;
  onFeedChange: (feed: ArticleFeedType) => void;
  isAuthenticated?: boolean;
}

// Feed Tabs Component - Single Responsibility: Handle feed type selection
export function FeedTabs({
  activeFeed,
  onFeedChange,
  isAuthenticated = false,
}: FeedTabsProps) {
  const feedOptions = [
    { value: "global" as ArticleFeedType, label: "Global Feed" },
    {
      value: "feed" as ArticleFeedType,
      label: "Your Feed",
      disabled: !isAuthenticated,
    },
  ];

  return (
    <div className="card mb-4">
      <div className="card-body">
        <ul className="nav nav-tabs nav-fill" role="tablist">
          {feedOptions.map((option) => (
            <li key={option.value} className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeFeed === option.value ? "active" : ""
                } ${option.disabled ? "disabled" : ""}`}
                onClick={() => !option.disabled && onFeedChange(option.value)}
                disabled={option.disabled}
                type="button"
                role="tab"
                aria-selected={activeFeed === option.value}
                aria-controls={`${option.value}-tab`}
              >
                {option.label}
                {option.disabled && (
                  <small className="text-muted d-block">(Login required)</small>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
