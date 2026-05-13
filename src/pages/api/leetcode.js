// LeetCode stats API proxy for Next.js
export default async function handler(req, res) {
  // Cache for 1 hour
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

  try {
    const response = await fetch(
      'https://leetcode.com/graphql/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://leetcode.com',
        },
        body: JSON.stringify({
          query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                username
                profile {
                  ranking
                }
                submitStats: submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                    submissions
                  }
                }
              }
            }
          `,
          variables: { username: 'Dhruvesh1611' },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      // Fallback to community API
      const fallbackRes = await fetch('https://alfa-leetcode-api.onrender.com/Dhruvesh1611/solved');
      const fallbackData = await fallbackRes.json();

      return res.status(200).json({
        totalSolved: fallbackData.solvedProblem || 0,
        easySolved: fallbackData.easySolved || 0,
        mediumSolved: fallbackData.mediumSolved || 0,
        hardSolved: fallbackData.hardSolved || 0,
        ranking: null,
      });
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const allStat = stats.find(s => s.difficulty === 'All');
    const easyStat = stats.find(s => s.difficulty === 'Easy');
    const mediumStat = stats.find(s => s.difficulty === 'Medium');
    const hardStat = stats.find(s => s.difficulty === 'Hard');

    res.status(200).json({
      totalSolved: allStat?.count || 0,
      easySolved: easyStat?.count || 0,
      mediumSolved: mediumStat?.count || 0,
      hardSolved: hardStat?.count || 0,
      ranking: data.data.matchedUser.profile?.ranking || null,
    });
  } catch (err) {
    // Ultimate fallback with community API
    try {
      const fallbackRes = await fetch('https://alfa-leetcode-api.onrender.com/Dhruvesh1611/solved');
      const fallbackData = await fallbackRes.json();

      return res.status(200).json({
        totalSolved: fallbackData.solvedProblem || 0,
        easySolved: fallbackData.easySolved || 0,
        mediumSolved: fallbackData.mediumSolved || 0,
        hardSolved: fallbackData.hardSolved || 0,
        ranking: null,
      });
    } catch {
      res.status(500).json({ error: 'Failed to fetch LeetCode stats', details: err.message });
    }
  }
}
