import React, { useState, useEffect } from "react";
import Select from "react-select";

import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import { fetchAnalysis } from "../../api/api";
import LangRev from "./lang-revenue/LangRev";
import Gross from "./blockbuster-gross/Gross";
import CombinedCharts from "./analysis3/GenrePieChart";
import Analysis4 from "./analysis4/Analysis4";
import Analysis5 from "./analysis5/Analysis5";

const analysisData = [
  { value: "languageRevenue", label: "Language-Revenue" },
  { value: "blockBuster", label: "BlockBuster-Gross" },
  { value: "genreHit", label: "Genre-Success" },
  { value: "langExp", label: "Language-Expense" },
  { value: "analysis5", label: "Month-Hitrate" },
];

const yearData = [
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
  { value: "1999", label: "1999" },
  { value: "1998", label: "1998" },
  { value: "1997", label: "1997" },
  { value: "1996", label: "1996" },
  { value: "1995", label: "1995" },
  { value: "1994", label: "1994" },
  { value: "1993", label: "1993" },
  { value: "1992", label: "1992" },
  { value: "1991", label: "1991" },
  { value: "1990", label: "1990" },
  { value: "1989", label: "1989" },
  { value: "1988", label: "1988" },
  { value: "1987", label: "1987" },
  { value: "1986", label: "1986" },
  { value: "1985", label: "1985" },
  { value: "1984", label: "1984" },
  { value: "1983", label: "1983" },
  { value: "1982", label: "1982" },
  { value: "1981", label: "1981" },
  { value: "1980", label: "1980" },
];

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setAnalysis({ value: "languageRevenue", label: "Language-Revenue" });
    setYear({ value: "2015", label: "2015" });
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (analysis && year) {
        setLoading(true);
        const result = await fetchAnalysis(analysis.value, year.value);
        setData(result);
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [analysis, year]);

  const onChange = (selectedItem, action) => {
    if (action.name === "analysis") {
      setAnalysis(selectedItem);
    } else if (action.name === "year") {
      setYear(selectedItem);
    }
  };

  return (
    <div className="explorePage">
        <div className="pageHeader">
          <div className="pageTitle">Select Analysis</div>
          <div className="filters">
            <Select
              name="year"
              value={year}
              options={yearData}
              onChange={onChange}
              placeholder="Select Year"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="analysis"
              value={analysis}
              options={analysisData}
              onChange={onChange}
              placeholder="Select Analysis"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
          {!loading && analysis && analysis.value === "languageRevenue" && (
            <LangRev data={data}/>
          )}
          {!loading && analysis && analysis.value === "blockBuster" && (
            <Gross data={data}/>
          )}
          {!loading && analysis && analysis.value === "genreHit" && (
            <CombinedCharts data={data} className="testComp"/>
          )}
          {!loading && analysis && analysis.value === "langExp" && (
            <Analysis4 data={data}/>
          )}
          {!loading && analysis && analysis.value === "analysis5" && (
            <Analysis5 newDummyData={data}/>
          )}
    </div>
  );
};

export default Analysis;
