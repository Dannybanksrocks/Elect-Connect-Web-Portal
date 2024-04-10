import { getPartyColor } from "../components/Colors";

export const reduce = (arrayOfObjects, key) => {
  return arrayOfObjects.reduce((accumulator, currentValue) => {
    if (key) {
      return accumulator + (currentValue[key] || 0);
    } else {
      return accumulator + (currentValue || 0);
    }
  }, 0);
};

export const winMargin = (data) => {
  const aggregatedData = {};
  const candidateVotes = {};
  let totalVotes = 0;
  data.forEach((obj) => {
    const { precinctName, candidateName, votesObtain } = obj;
    if (!aggregatedData[precinctName]) {
      aggregatedData[precinctName] = {};
    }
    if (!aggregatedData[precinctName][candidateName]) {
      aggregatedData[precinctName][candidateName] = 0;
    }
    aggregatedData[precinctName][candidateName] += votesObtain;
    if (!candidateVotes[candidateName]) {
      candidateVotes[candidateName] = 0;
    }
    candidateVotes[candidateName] += votesObtain;
    totalVotes += votesObtain;
  });
  let winningParty = "";
  let maxVotes = 0;
  for (const candidateName in candidateVotes) {
    const votes = candidateVotes[candidateName];
    if (votes > maxVotes) {
      maxVotes = votes;
      winningParty = candidateName;
    }
  }
  const fiftyPercentOfVotesPlusOne = ((50 / 100) * totalVotes).toFixed(2) + 1;
  const winMargin = (
    ((maxVotes - fiftyPercentOfVotesPlusOne) / totalVotes) *
    100
  ).toFixed(2);
  return {
    votesFor: maxVotes,
    votesNotFor: totalVotes - maxVotes,
    totalVotes,
    winMargin,
    winningParty,
  };
};

export const winMargin_County = (data, countyAccess) => {
  const aggregatedData = {};
  const candidateVotes = {};
  let totalVotes = 0;
  data.forEach((obj) => {
    const { precinctName, candidateName, votesObtain, county } = obj;
    if (county === countyAccess) {
      if (!aggregatedData[precinctName]) {
        aggregatedData[precinctName] = {};
      }
      if (!aggregatedData[precinctName][candidateName]) {
        aggregatedData[precinctName][candidateName] = 0;
      }
      aggregatedData[precinctName][candidateName] += votesObtain;

      if (!candidateVotes[candidateName]) {
        candidateVotes[candidateName] = 0;
      }
      candidateVotes[candidateName] += votesObtain;
      totalVotes += votesObtain;
    }
  });
  let winningParty = "";
  let maxVotes = 0;
  for (const candidateName in candidateVotes) {
    const votes = candidateVotes[candidateName];
    if (votes > maxVotes) {
      maxVotes = votes;
      winningParty = candidateName;
    }
  }
  const fiftyPercentOfVotesPlusOne = ((50 / 100) * totalVotes).toFixed(2) + 1;
  const winMargin = (
    ((maxVotes - fiftyPercentOfVotesPlusOne) / totalVotes) *
    100
  ).toFixed(2);
  return {
    votesFor: maxVotes,
    votesNotFor: totalVotes - maxVotes,
    totalVotes,
    winMargin,
    winningParty,
  };
};

export const winMargin_District = (data, districtAccess) => {
  const aggregatedData = {};
  const candidateVotes = {};
  let totalVotes = 0;
  data.forEach((obj) => {
    const { precinctName, candidateName, votesObtain, districtName } = obj;
    if (districtName === districtAccess) {
      if (!aggregatedData[precinctName]) {
        aggregatedData[precinctName] = {};
      }
      if (!aggregatedData[precinctName][candidateName]) {
        aggregatedData[precinctName][candidateName] = 0;
      }
      aggregatedData[precinctName][candidateName] += votesObtain;

      if (!candidateVotes[candidateName]) {
        candidateVotes[candidateName] = 0;
      }
      candidateVotes[candidateName] += votesObtain;
      totalVotes += votesObtain;
    }
  });
  let winningParty = "";
  let maxVotes = 0;
  for (const candidateName in candidateVotes) {
    const votes = candidateVotes[candidateName];
    if (votes > maxVotes) {
      maxVotes = votes;
      winningParty = candidateName;
    }
  }
  const fiftyPercentOfVotesPlusOne = ((50 / 100) * totalVotes).toFixed(2) + 1;
  const winMargin = (
    ((maxVotes - fiftyPercentOfVotesPlusOne) / totalVotes) *
    100
  ).toFixed(2);
  return {
    votesFor: maxVotes,
    votesNotFor: totalVotes - maxVotes,
    totalVotes,
    winMargin,
    winningParty,
  };
};

export const voteResultsbyCounty = (data) => {
  if (data && data.length > 0) {
    const uniqueCounties = Array.from(new Set(data.map((item) => item.county)));
    const chartData = {
      labels: uniqueCounties,
      datasets: [],
    };
    const candidateNames = Array.from(
      new Set(data.map((item) => item.candidateName))
    );
    candidateNames.forEach((candidateName) => {
      const counts = uniqueCounties.map((county) => {
        const countyData = data.find(
          (item) =>
            item.county === county && item.candidateName === candidateName
        );
        return countyData ? countyData.votesValid : 0;
      });

      chartData.datasets.push({
        label: candidateName,
        data: counts,
        backgroundColor: getPartyColor(candidateName),
      });
    });

    return {
      ...chartData,
      totalVotes: reduce(chartData.datasets.map((data) => reduce(data.data))),
    };
  }
  return null;
};

export const voteResultsbyCounty_County = (data, countyAccess) => {
  if (data && data.length > 0) {
    const filter = data.filter((item) => item.county === countyAccess);
    const uniqueDistricts = Array.from(
      new Set(filter.map((item) => item.districtName))
    );
    const chartData = {
      labels: uniqueDistricts,
      datasets: [],
    };
    const candidateNames = Array.from(
      new Set(filter.map((item) => item.candidateName))
    );
    candidateNames.forEach((candidateName) => {
      const counts = uniqueDistricts.map((district) => {
        const districtData = filter.filter(
          (item) =>
            item.districtName === district &&
            item.candidateName === candidateName
        );
        return districtData.length > 0 ? reduce(districtData, "votesValid") : 0;
      });
      chartData.datasets.push({
        label: candidateName,
        data: counts,
        backgroundColor: getPartyColor(candidateName),
      });
    });
    return {
      ...chartData,
      totalVotes: reduce(chartData.datasets.map((data) => reduce(data.data))),
    };
  }
  return null;
};

export const voteResultsbyCounty_District = (data, districtAccess) => {
  if (data && data.length > 0) {
    const filter = data.filter((item) => item.districtName === districtAccess);
    const uniquePolls = Array.from(
      new Set(
        filter.map(
          (item) =>
            `Center ${item.centerCode} Polling Place ${item.pollingNumber}`
        )
      )
    );
    const chartData = {
      labels: uniquePolls,
      datasets: [],
    };
    const candidateNames = Array.from(
      new Set(filter.map((item) => item.candidateName))
    );

    candidateNames.forEach((candidateName) => {
      const counts = uniquePolls.map((poll) => {
        const pollingData = filter.filter(
          (item) =>
            `Center ${item.centerCode} Polling Place ${item.pollingNumber}` ===
              poll && item.candidateName === candidateName
        );
        return pollingData.length > 0 ? reduce(pollingData, "votesValid") : 0;
      });

      chartData.datasets.push({
        label: candidateName,
        data: counts,
        backgroundColor: getPartyColor(candidateName),
      });
    });

    return {
      ...chartData,
      labels: chartData.labels.map((item) => `Polling ${item}`),
      totalVotes: reduce(chartData.datasets.map((data) => reduce(data.data))),
    };
  }
  return null;
};

export const precincts = (data) => {
  const precincts = {};
  data.forEach((item) => {
    const precinctName = item.precinctName;
    if (!precincts[precinctName]) {
      precincts[precinctName] = { precinctName };
    }
    precincts[precinctName].totalFemales =
      (precincts[precinctName].totalFemales || 0) + item.totalFemales;
    precincts[precinctName].totalMales =
      (precincts[precinctName].totalMales || 0) + item.totalMales;
    precincts[precinctName].totalVoters =
      (precincts[precinctName].totalVoters || 0) + item.totalVoters;
    precincts[precinctName].votesInvalid =
      (precincts[precinctName].votesInvalid || 0) + item.votesInvalid;
    precincts[precinctName].votesValid =
      (precincts[precinctName].votesValid || 0) + item.votesValid;
    precincts[precinctName].totalPolls =
        (precincts[precinctName].totalPolls || 0) + item.votesValid;
  });
  const precinctArray = Object.values(precincts);
  return precinctArray;
};

export const precincts_County = (data, countyAccess) => {
  const precincts = {};
  const filteredData = data.filter((item) => item.county === countyAccess);
  filteredData.forEach((item) => {
    const precinctName = item.precinctName;
    if (!precincts[precinctName]) {
      precincts[precinctName] = { precinctName };
    }
    precincts[precinctName].totalFemales =
      (precincts[precinctName].totalFemales || 0) + item.totalFemales;
    precincts[precinctName].totalMales =
      (precincts[precinctName].totalMales || 0) + item.totalMales;
    precincts[precinctName].totalVoters =
      (precincts[precinctName].totalVoters || 0) + item.totalVoters;
    precincts[precinctName].votesInvalid =
      (precincts[precinctName].votesInvalid || 0) + item.votesInvalid;
    precincts[precinctName].votesValid =
      (precincts[precinctName].votesValid || 0) + item.votesValid;
  });
  const precinctArray = Object.values(precincts);
  return precinctArray;
};

export const polling = (data) => {
  const polls = {};
  const unique = [...new Set(data.map(item => `${item.centerCode}-${item.pollingNumber}`))];
  data.forEach((item) => {
    const pollId = item.pollId;
    if (!polls[pollId]) {
      polls[pollId] = { pollId };
    }
    polls[pollId].reportingPolls = unique.length;
    polls[pollId].totalFemales =
      (polls[pollId].totalFemales || 0) + item.totalFemales;
    polls[pollId].totalMales =
      (polls[pollId].totalMales || 0) + item.totalMales;
    polls[pollId].totalVoters =
      (polls[pollId].totalVoters || 0) + item.totalVoters;
    polls[pollId].votesInvalid =
      (polls[pollId].votesInvalid || 0) + item.votesInvalid;
    polls[pollId].votesValid =
      (polls[pollId].votesValid || 0) + item.votesValid;
  });
  const pollsArray = Object.values(polls);
  return pollsArray;
};

export const polling_County = (data, countyAccess) => {
  const polls = {};
  const filteredData = data.filter((item) => item.county === countyAccess);
  filteredData.forEach((item) => {
    const pollId = item.pollId;
    if (!polls[pollId]) {
      polls[pollId] = { pollId };
    }
    polls[pollId].totalFemales =
      (polls[pollId].totalFemales || 0) + item.totalFemales;
    polls[pollId].totalMales =
      (polls[pollId].totalMales || 0) + item.totalMales;
    polls[pollId].totalVoters =
      (polls[pollId].totalVoters || 0) + item.totalVoters;
    polls[pollId].votesInvalid =
      (polls[pollId].votesInvalid || 0) + item.votesInvalid;
    polls[pollId].votesValid =
      (polls[pollId].votesValid || 0) + item.votesValid;
  });
  const pollsArray = Object.values(polls);
  return pollsArray;
};

export const polling_District = (data, districtAccess) => {
  const polls = {};
  const filteredData = data.filter(
    (item) => item.districtName === districtAccess
  );
  filteredData.forEach((item) => {
    const pollId = item.pollId;
    if (!polls[pollId]) {
      polls[pollId] = { pollId };
    }
    polls[pollId].totalFemales =
      (polls[pollId].totalFemales || 0) + item.totalFemales;
    polls[pollId].totalMales =
      (polls[pollId].totalMales || 0) + item.totalMales;
    polls[pollId].totalVoters =
      (polls[pollId].totalVoters || 0) + item.totalVoters;
    polls[pollId].votesInvalid =
      (polls[pollId].votesInvalid || 0) + item.votesInvalid;
    polls[pollId].votesValid =
      (polls[pollId].votesValid || 0) + item.votesValid;
  });
  const pollsArray = Object.values(polls);
  return pollsArray;
};

export const precinctsBigWins = (data, candidateName) => {
  const result = [];
  const resultMap = new Map();
  data.forEach((item) => {
    if (!candidateName || item.candidateName === candidateName) {
      const key = item.precinctName + item.candidateName;
      if (!resultMap.has(key)) {
        resultMap.set(key, {
          precinctName: item.precinctName,
          candidateName: item.candidateName,
          totalVotesObtained: item.votesObtain,
        });
      } else {
        const existingItem = resultMap.get(key);
        existingItem.totalVotesObtained += item.votesObtain;
      }
    }
  });
  result.push(...resultMap.values());
  return result;
};

export const precinctsBigWins_County = (data, countyAccess, candidateName) => {
  const result = [];
  const resultMap = new Map();
  const filteredData = data.filter((item) => item.county === countyAccess);
  filteredData.forEach((item) => {
    if (!candidateName || item.candidateName === candidateName) {
      const key = item.precinctName + item.candidateName;
      if (!resultMap.has(key)) {
        resultMap.set(key, {
          precinctName: item.precinctName,
          candidateName: item.candidateName,
          totalVotesObtained: item.votesObtain,
        });
      } else {
        const existingItem = resultMap.get(key);
        existingItem.totalVotesObtained += item.votesObtain;
      }
    }
  });
  result.push(...resultMap.values());
  return result;
};

export const lastHourVoteResults = (data) => {
  function isOneHourOld(dateValue) {
    if (!(dateValue instanceof Date)) {
      dateValue = new Date(dateValue);
    }
    const currentDate = new Date();
    const timeDifference = currentDate - dateValue;
    return timeDifference <= 3600000;
  }
  const objectsModifiedInLastHour = data.filter((obj) =>
    isOneHourOld(obj.modifiedDate)
  );
  return objectsModifiedInLastHour;
};

export const lastHourVoteResults_County = (data, countyAccess) => {
  function isOneHourOld(dateValue) {
    if (!(dateValue instanceof Date)) {
      dateValue = new Date(dateValue);
    }
    const currentDate = new Date();
    const timeDifference = currentDate - dateValue;
    return timeDifference <= 3600000;
  }
  const filteredData = data.filter((item) => item.county === countyAccess);
  const objectsModifiedInLastHour = filteredData.filter((obj) =>
    isOneHourOld(obj.modifiedDate)
  );
  return objectsModifiedInLastHour;
};

export const lastHourVoteResults_District = (data, districtAccess) => {
  function isOneHourOld(dateValue) {
    if (!(dateValue instanceof Date)) {
      dateValue = new Date(dateValue);
    }
    const currentDate = new Date();
    const timeDifference = currentDate - dateValue;
    return timeDifference <= 3600000;
  }
  const filteredData = data.filter(
    (item) => item.districtName === districtAccess
  );
  const objectsModifiedInLastHour = filteredData.filter((obj) =>
    isOneHourOld(obj.modifiedDate)
  );
  return objectsModifiedInLastHour;
};

export const precinctTableCleanUp = (data) => {
  const uniquePollIds = new Set();
  const uniqueData = [];
  for (const record of data) {
    if (!uniquePollIds.has(record.pollId)) {
      uniqueData.push(record);
      uniquePollIds.add(record.pollId);
    }
  }
  return uniqueData;
};
