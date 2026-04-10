export function generateInsights(stats, matches) {
  const insights = [];
  if (!stats) return insights;

  const { matchesPlayed, totalRuns, totalWickets, strikeRate } = stats;

  if (matchesPlayed < 5) insights.push('Play more matches to get better analytics.');
  if (strikeRate > 120) insights.push('Strong strike rate — focus on conversion to big scores.');
  if (totalWickets === 0 && matchesPlayed > 3) insights.push('Work on bowling variations to pick wickets.');
  if (totalRuns / Math.max(1, matchesPlayed) < 20) insights.push('Consider strengthening batting technique and fitness.');

  // Trend: check last 3 matches average runs
  const last3 = matches.slice(0, 5);
  if (last3.length >= 3) {
    const avg = last3.reduce((s, m) => s + (Number(m.playerRuns || 0)), 0) / last3.length;
    if (avg > 40) insights.push('Recent form is improving — keep consistency during nets.');
    if (avg < 10) insights.push('Recent form dipped — review video/technique.');
  }

  if (insights.length === 0) insights.push('No major suggestions — keep training and track matches.');

  return insights;
}
