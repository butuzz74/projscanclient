if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/butuz/.gradle/caches/8.13/transforms/8fcf330c88260c56462e1ed111d25fc4/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/butuz/.gradle/caches/8.13/transforms/8fcf330c88260c56462e1ed111d25fc4/transformed/hermes-android-0.79.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

