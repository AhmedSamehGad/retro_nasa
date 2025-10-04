import mongoose from 'mongoose'

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    searchCount: { type: Number, default: 0 },
    type: { type: String, required: true },
    location: { type: String, default: "" },

    discovery: {
        year: { type: Number, default: null },
        discoverer: { type: String, default: "" }
    },

    status: {
        previous: { type: String, default: "" },
        current: { type: String, default: "" },
        changed_by: { type: String, default: "" },
        year_changed: { type: Number, default: null }
    },

    etymology: { type: String, default: "" },

    physical: {
        diameter_km: { type: Number, default: null },
        mass_kg: { type: Number, default: null },
        mass_percent_earth: { type: Number, default: null },
        gravity_relative_earth: { type: Number, default: null },
        example_weight: {
            earth_kg: { type: Number, default: null },
            pluto_kg: { type: Number, default: null }
        }
    },

    orbit: {
        distance_from_sun_km: { type: Number, default: null },
        distance_from_sun_AU: { type: Number, default: null },
        year_length_earth_years: { type: Number, default: null },
        day_length_earth_days: { type: Number, default: null },
        orbit_shape: { type: String, default: "" },
        special_note: { type: String, default: "" }
    },

    atmosphere: {
        composition: { type: [String], default: [] },
        behavior: { type: String, default: "" }
    },

    surface: {
        composition: { type: [String], default: [] },
        notable_features: { type: [String], default: [] }
    },

    moons: [
        {
            name: { type: String, required: true },
            note: { type: String, default: "" }
        }
    ],

    exploration: [
        {
            mission: { type: String, default: "" },
            agency: { type: String, default: "" },
            year: { type: Number, default: null },
            findings: { type: [String], default: [] }
        }
    ],

    quick_facts: {
        type: { type: String, default: "" },
        diameter_km: { type: Number, default: null },
        mass_kg: { type: Number, default: null },
        day_length_earth_days: { type: Number, default: null },
        year_length_earth_years: { type: Number, default: null },
        number_of_moons: { type: Number, default: 0 },
        largest_moon: { type: String, default: "" },
        highlight_features: { type: [String], default: [] }
    },

    media: {
        video_url: { type: String, default: "" }
    }
}, { timestamps: true })

const Planet = mongoose.model('Planet', planetSchema)
export default Planet
