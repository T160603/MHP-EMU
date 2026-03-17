const ShuntField = [
    { name: 'Phase', label: 'Phase', type: 'radio', options: ['R', 'Y', 'B',] },
    { name: 'HV Winding Temperature of WTI (◦C)', label: 'HV Winding Temperature of WTI (◦C)', type: 'number',  },
    { name: 'Oil Temperature from OTI (◦C)', label: 'Oil Temperature from OTI (◦C)', type: 'number',  },
    { name: 'Conservation Tank oil level from Level Indicator', label: 'Conservation Tank oil level from Level Indicator', type: 'text',  },
    { name: 'Any oil leakages from Shunt Reactor Body (Yes/No)', label: 'Any oil leakages from Shunt Reactor Body (Yes/No)', type: 'radio', options: ['NO', 'Yes']  },
    { name: 'Oil Circulating Pump (OCP) Selection Switch PSS1 (P1/P2)', label: 'Oil Circulating Pump (OCP) Selection Switch PSS1 (P1/P2)', type: 'radio', options: ['P1', 'P2']  },
    { name: 'Cooler Control Selector Switch CSS1 Position (Remote/Local Manual/Local Auto)', label: 'Cooler Control Selector Switch CSS1 Position (Remote/Local Manual/Local Auto)', type: 'radio', options: ['Remote', 'Local Manual', 'Local Auto']  },
    { name: 'CW Motorized Valve VSS1 selection position (Standby/Service/OFF)', label: 'CW Motorized Valve VSS1 selection position (Standby/Service/OFF)', type: 'radio', options: ['Service', 'Standby', 'OFF']  },
    { name: 'CW Motorized Valve VSS2 selection position (Standby/Service/OFF)', label: 'CW Motorized Valve VSS2 selection position (Standby/Service/OFF)', type: 'radio', options: ['Service', 'Standby', 'OFF']  },
    { name: 'Inlet CW Pressure (Bar)', label: 'Inlet CW Pressure (Bar)', type: 'number'},
    { name: 'Inlet CW Temperature (◦C)', label: 'Inlet CW Temperature (◦C)', type: 'number'},
    { name: 'Any oil leakages from oil pipelines (Yes/No)', label: 'Any oil leakages from oil pipelines (Yes/No)', type: 'radio', options: ['NO', 'Yes']  },
    { name: 'Any water leakages from CW pipelines (Yes/No)', label: 'Any water leakages from CW pipelines (Yes/No)', type: 'radio', options: ['NO', 'Yes']  },
    { name: 'Water Accumulation in float level switch (Yes/No)', label: 'Water Accumulation in float level switch (Yes/No)', type: 'radio', options: ['NO', 'Yes']  },
    { name: 'Oil Level in Breather Cup (High/Normal/Low)', label: 'Oil Level in Breather Cup (High/Normal/Low)', type: 'radio', options: ['High', 'Normal', 'Low']  },
    { name: 'Any changes in Silica Gel Colour (Normal/Slightly/ Completely)', label: 'Any changes in Silica Gel Colour (Normal/Slightly/ Completely)', type: 'radio', options: ['Normal', 'Slightly', 'Completely']  },
    { name: 'Any abnormal sound from Shunt Reactor components (No/Yes, Specify if yes)', label: 'Any abnormal sound from Shunt Reactor components (No/Yes, Specify if yes)', type: 'text'},
    { name: 'Water (H2O) content from DGA (PPM)', label: 'Water (H2O) content from DGA (PPM)', type: 'number',  },
    { name: 'Carbon (CO) content from DGA (PPM)', label: 'Carbon (CO) content from DGA (PPM)', type: 'number',  },
    { name: 'Hydrogen (H2) content from DGA (PPM)', label: 'Hydrogen (H2) content from DGA (PPM)', type: 'number',  },

]
export default ShuntField