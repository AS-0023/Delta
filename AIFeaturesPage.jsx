import React from 'react';
import './AIFeaturesPage.css';
import AICostPredictionSection from './components/AICostPredictionSection';
import ProductivityMonitoringSection from './components/ProductivityMonitoringSection';
import IntelligentTaskAllocationSection from './components/IntelligentTaskAllocationSection';
import PerformanceScoringEngineSection from './components/PerformanceScoringEngineSection';
import RiskDetectionSection from './components/RiskDetectionSection';
import ReportGeneratorSection from './components/ReportGeneratorSection';
import CuteRobotDashboardSection from './components/CuteRobotDashboardSection';

const AIFeaturesPage = () => {
    return (
        <>
            <CuteRobotDashboardSection />
            <AICostPredictionSection />
            <ProductivityMonitoringSection />
            <IntelligentTaskAllocationSection />
            <PerformanceScoringEngineSection />
            <RiskDetectionSection />
            <ReportGeneratorSection />
        </>
    );
};

export default AIFeaturesPage;
