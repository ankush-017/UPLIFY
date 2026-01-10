import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import PreviewSection from '../../PreviewSection';

function FullPreviewModal({ resumeInfo, onClose }) {
    
    const handleDownload = () => {
        // Sets the PDF filename to User_Name.pdf
        const originalTitle = document.title;
        document.title = `${resumeInfo?.firstName || 'Resume'}_${resumeInfo?.lastName || 'Builder'}`;
        
        window.print();
        
        // Restore title after print dialog closes
        document.title = originalTitle;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300 print:static print:block">
            
            {/* Backdrop: Hidden during download */}
            <div 
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-md print:hidden"
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <div className="relative w-full max-w-[950px] h-[95vh] overflow-y-auto bg-slate-200 rounded-2xl shadow-2xl z-[110] custom-scrollbar
                print:bg-white print:h-auto print:max-w-none print:static print:shadow-none print:overflow-visible">
                
                {/* Control Header: Hidden during download */}
                <div className="sticky top-0 right-0 left-0 p-4 bg-white/95 backdrop-blur-md border-b flex justify-between items-center z-[120] print:hidden">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-400" />
                            <div className="h-3 w-3 rounded-full bg-yellow-400" />
                            <div className="h-3 w-3 rounded-full bg-green-400" />
                        </div>
                        <div className="h-6 w-[1px] bg-gray-200 mx-2" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={14} className="text-green-600"/> 
                            Professional PDF Preview
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleDownload}
                            className="bg-green-700 hover:bg-green-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                            <Printer size={18} />
                            Download PDF
                        </button>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* The Resume Content */}
                <div className="flex justify-center p-8 md:p-12 print:p-0 print:block">
                    <div 
                        id="print-area" 
                        className="bg-white shadow-2xl w-full max-w-[800px] min-h-[1123px] print:shadow-none print:w-full print:max-w-full print:block"
                    >
                        {/* Always force darkMode false for the final PDF */}
                        <PreviewSection resumeInfo={resumeInfo} forceLightMode={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullPreviewModal;