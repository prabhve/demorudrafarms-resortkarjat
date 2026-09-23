import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  RESORT_META as DEFAULT_RESORT_META,
  ROOMS_DATA as DEFAULT_ROOMS_DATA,
  AMENITIES_DATA as DEFAULT_AMENITIES_DATA,
  MENU_ITEMS as DEFAULT_MENU_ITEMS,
  GALLERY_ITEMS as DEFAULT_GALLERY_ITEMS,
  ATTRACTIONS_DATA as DEFAULT_ATTRACTIONS_DATA,
  REVIEWS_DATA as DEFAULT_REVIEWS_DATA,
  HERO_SLIDES as DEFAULT_HERO_SLIDES,
  STORY_DATA as DEFAULT_STORY_DATA,
  HeroSlide,
  GalleryItem
} from '../data/resortData';
import { RoomOption, AmenityItem, MenuItem, AttractionItem, ReviewItem } from '../types';

export interface PricingConfig {
  extraAdultFee: number;
  extraChildFee: number;
  breakfastPerHead: number;
  allMealsPerHead: number;
  bbqAddonPerHead: number;
  gstPercent: number;
  securityDeposit: number;
  weekendSurgePercent: number;
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  extraAdultFee: 1500,
  extraChildFee: 800,
  breakfastPerHead: 350,
  allMealsPerHead: 1400,
  bbqAddonPerHead: 650,
  gstPercent: 18,
  securityDeposit: 5000,
  weekendSurgePercent: 25
};

const STORAGE_KEY = 'rudra_farms_cms_state_v2';

interface ResortDataContextType {
  resortMeta: typeof DEFAULT_RESORT_META;
  roomsData: RoomOption[];
  amenitiesData: AmenityItem[];
  menuItems: MenuItem[];
  galleryItems: GalleryItem[];
  attractionsData: AttractionItem[];
  reviewsData: ReviewItem[];
  heroSlides: HeroSlide[];
  storyData: typeof DEFAULT_STORY_DATA;
  pricingConfig: PricingConfig;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  // Update functions
  updateResortMeta: (data: Partial<typeof DEFAULT_RESORT_META>) => void;
  updateRoom: (id: string, updated: Partial<RoomOption>) => void;
  addRoom: (room: RoomOption) => void;
  deleteRoom: (id: string) => void;
  updateAmenity: (id: string, updated: Partial<AmenityItem>) => void;
  addAmenity: (amenity: AmenityItem) => void;
  deleteAmenity: (id: string) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  updateAttraction: (id: string, updated: Partial<AttractionItem>) => void;
  addAttraction: (item: AttractionItem) => void;
  deleteAttraction: (id: string) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  addReview: (item: ReviewItem) => void;
  deleteReview: (id: string) => void;
  updateHeroSlide: (id: string, updated: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  updatePricingConfig: (config: Partial<PricingConfig>) => void;
  updateStoryData: (story: Partial<typeof DEFAULT_STORY_DATA>) => void;
  resetToDefaults: () => void;
}

const ResortDataContext = createContext<ResortDataContextType | undefined>(undefined);

export const ResortDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminOpen, setAdminOpen] = useState(false);

  // Initialize from LocalStorage or defaults
  const [resortMeta, setResortMeta] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_meta`);
      return saved ? JSON.parse(saved) : DEFAULT_RESORT_META;
    } catch {
      return DEFAULT_RESORT_META;
    }
  });

  const [roomsData, setRoomsData] = useState<RoomOption[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_rooms`);
      return saved ? JSON.parse(saved) : DEFAULT_ROOMS_DATA;
    } catch {
      return DEFAULT_ROOMS_DATA;
    }
  });

  const [amenitiesData, setAmenitiesData] = useState<AmenityItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_amenities`);
      return saved ? JSON.parse(saved) : DEFAULT_AMENITIES_DATA;
    } catch {
      return DEFAULT_AMENITIES_DATA;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_menu`);
      return saved ? JSON.parse(saved) : DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY_ITEMS;
    } catch {
      return DEFAULT_GALLERY_ITEMS;
    }
  });

  const [attractionsData, setAttractionsData] = useState<AttractionItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_attractions`);
      return saved ? JSON.parse(saved) : DEFAULT_ATTRACTIONS_DATA;
    } catch {
      return DEFAULT_ATTRACTIONS_DATA;
    }
  });

  const [reviewsData, setReviewsData] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reviews`);
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS_DATA;
    } catch {
      return DEFAULT_REVIEWS_DATA;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [storyData, setStoryData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_story`);
      return saved ? JSON.parse(saved) : DEFAULT_STORY_DATA;
    } catch {
      return DEFAULT_STORY_DATA;
    }
  });

  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pricing`);
      return saved ? JSON.parse(saved) : DEFAULT_PRICING_CONFIG;
    } catch {
      return DEFAULT_PRICING_CONFIG;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_meta`, JSON.stringify(resortMeta));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [resortMeta]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_rooms`, JSON.stringify(roomsData));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [roomsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_amenities`, JSON.stringify(amenitiesData));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [amenitiesData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_menu`, JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_attractions`, JSON.stringify(attractionsData));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [attractionsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_reviews`, JSON.stringify(reviewsData));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [reviewsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroSlides));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_story`, JSON.stringify(storyData));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [storyData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pricing`, JSON.stringify(pricingConfig));
    } catch (e) {
      console.warn('Storage limit', e);
    }
  }, [pricingConfig]);

  // Update handlers
  const updateResortMeta = (data: Partial<typeof DEFAULT_RESORT_META>) => {
    setResortMeta((prev: typeof DEFAULT_RESORT_META) => ({ ...prev, ...data }));
  };

  const updateRoom = (id: string, updated: Partial<RoomOption>) => {
    setRoomsData((prev) =>
      prev.map((room) => (room.id === id ? { ...room, ...updated } : room))
    );
  };

  const addRoom = (room: RoomOption) => {
    setRoomsData((prev) => [...prev, room]);
  };

  const deleteRoom = (id: string) => {
    setRoomsData((prev) => prev.filter((r) => r.id !== id));
  };

  const updateAmenity = (id: string, updated: Partial<AmenityItem>) => {
    setAmenitiesData((prev) =>
      prev.map((amenity) => (amenity.id === id ? { ...amenity, ...updated } : amenity))
    );
  };

  const addAmenity = (amenity: AmenityItem) => {
    setAmenitiesData((prev) => [...prev, amenity]);
  };

  const deleteAmenity = (id: string) => {
    setAmenitiesData((prev) => prev.filter((a) => a.id !== id));
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  const updateAttraction = (id: string, updated: Partial<AttractionItem>) => {
    setAttractionsData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addAttraction = (item: AttractionItem) => {
    setAttractionsData((prev) => [...prev, item]);
  };

  const deleteAttraction = (id: string) => {
    setAttractionsData((prev) => prev.filter((a) => a.id !== id));
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setReviewsData((prev) =>
      prev.map((rev) => (rev.id === id ? { ...rev, ...updated } : rev))
    );
  };

  const addReview = (item: ReviewItem) => {
    setReviewsData((prev) => [item, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviewsData((prev) => prev.filter((r) => r.id !== id));
  };

  const updateHeroSlide = (id: string, updated: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((slide) => (slide.id === id ? { ...slide, ...updated } : slide))
    );
  };

  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => [...prev, slide]);
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const updatePricingConfig = (config: Partial<PricingConfig>) => {
    setPricingConfig((prev) => ({ ...prev, ...config }));
  };

  const updateStoryData = (story: Partial<typeof DEFAULT_STORY_DATA>) => {
    setStoryData((prev: typeof DEFAULT_STORY_DATA) => ({ ...prev, ...story }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_meta`);
    localStorage.removeItem(`${STORAGE_KEY}_rooms`);
    localStorage.removeItem(`${STORAGE_KEY}_amenities`);
    localStorage.removeItem(`${STORAGE_KEY}_menu`);
    localStorage.removeItem(`${STORAGE_KEY}_gallery`);
    localStorage.removeItem(`${STORAGE_KEY}_attractions`);
    localStorage.removeItem(`${STORAGE_KEY}_reviews`);
    localStorage.removeItem(`${STORAGE_KEY}_hero`);
    localStorage.removeItem(`${STORAGE_KEY}_story`);
    localStorage.removeItem(`${STORAGE_KEY}_pricing`);

    setResortMeta(DEFAULT_RESORT_META);
    setRoomsData(DEFAULT_ROOMS_DATA);
    setAmenitiesData(DEFAULT_AMENITIES_DATA);
    setMenuItems(DEFAULT_MENU_ITEMS);
    setGalleryItems(DEFAULT_GALLERY_ITEMS);
    setAttractionsData(DEFAULT_ATTRACTIONS_DATA);
    setReviewsData(DEFAULT_REVIEWS_DATA);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setStoryData(DEFAULT_STORY_DATA);
    setPricingConfig(DEFAULT_PRICING_CONFIG);
  };

  return (
    <ResortDataContext.Provider
      value={{
        resortMeta,
        roomsData,
        amenitiesData,
        menuItems,
        galleryItems,
        attractionsData,
        reviewsData,
        heroSlides,
        storyData,
        pricingConfig,
        adminOpen,
        setAdminOpen,
        updateResortMeta,
        updateRoom,
        addRoom,
        deleteRoom,
        updateAmenity,
        addAmenity,
        deleteAmenity,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateAttraction,
        addAttraction,
        deleteAttraction,
        updateReview,
        addReview,
        deleteReview,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updatePricingConfig,
        updateStoryData,
        resetToDefaults
      }}
    >
      {children}
    </ResortDataContext.Provider>
  );
};

export const useResortData = () => {
  const context = useContext(ResortDataContext);
  if (!context) {
    throw new Error('useResortData must be used within a ResortDataProvider');
  }
  return context;
};
