const genshinModel = {
    getAll:`
        SELECT
              *
        FROM
             genshin
       `,
       getByID:`
          SELECT
                *
            FROM
                 genshin
            WHERE
                id=?
      `,
      getByUsername:`
                   SELECT
                        *
                   FROM
                          genshin
                  WHERE
                         character_name = ?

                       `,
      addRow:`
            INSERT INTO
                genshin(
                    password,
                    character_name,
                    rarity,
                    region,
                    vision,
                    weapon_type,
                    model,
                    constellation,
                    birthday,
                    special_dish,
                    affiliation,
                    voice_eng,
                    voice_cn,
                    voice_jp,
                    voice_kr,
                    release_date,
                    ascension,
                    ascension_specialty,
                    ascension_talent,
                    ascension_boss,
                    talent_book,
                    talent_weekly,
                    hp_90_90,
                    atk_90_90,
                    def_90_90,
                    hp_80_90,
                    atk_80_90,
                    def_80_90,
                    hp_80_80,
                    atk_80_80,
                    def_80_80,
                    hp_70_80,
                    atk_70_80,
                    def_70_80,
                    hp_70_70,
                    atk_70_70,
                    def_70_70,
                    hp_60_70,
                    atk_60_70,
                    def_60_70,
                    hp_60_60,
                    atk_60_60,
                    def_60_60,
                    hp_50_60,
                    atk_50_60,
                    def_50_60,
                    hp_50_50,
                    atk_50_50,
                    def_50_50,
                    hp_40_50,
                    atk_40_50,
                    def_40_50,
                    hp_40_40,
                    atk_40_40,
                    def_40_40,
                    hp_20_40,
                    atk_20_40,
                    def_20_40,
                    hp_20_20,
                    atk_20_20,
                    def_20_20,
                    hp_1_20,
                    atk_1_20,
                    def_1_20,
                    spsecial_0,
                    special_1,
                    special_2,
                    special_3,
                    special_4,
                    special_5,
                    special_6,
                    is_active

                    )VALUES(                                                                                                                                                 
                         ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
                    )
                 `,
                 updateRow:`
                      UPDATE
                           genshin
                        SET
                        password = ?,
                        character_name =?,
                        rarity =?,
                        region =?,
                        vision =?,
                        weapon_type =?,
                        model =?,
                        constellation =?,
                        birthday =?,
                        special_dish =?,
                        affiliation =?,
                        voice_eng =?,
                        voice_cn =?,
                        voice_jp =?,
                        voice_kr =?,
                        release_date =?,
                        ascension =?,
                        ascension_specialty =?,
                        ascension_talent =?,
                        ascension_boss =?,
                        talent_book =?, 
                        talent_weekly =?,
                        hp_90_90 =?,
                        atk_90_90 =?,
                        def_90_90 =?,
                        hp_80_90 =?,
                        atk_80_90 =?,
                        def_80_90 =?,
                        hp_80_80 =?,
                        atk_80_80 =?,
                        def_80_80 =?,
                        hp_70_80 =?,
                        atk_70_80 =?,
                        def_70_80 =?,
                        hp_70_70 =?,
                        atk_70_70 =?,
                        def_70_70 =?,
                        hp_60_70 =?,
                        atk_60_70 =?,
                        def_60_70 =?,
                        hp_60_60 =?,
                        atk_60_60 =?,
                        def_60_60 =?,
                        hp_50_60 =?,
                        atk_50_60 =?,
                        def_50_60 =?,
                        hp_50_50 =?,
                        atk_50_50 =?,
                        def_50_50 =?,
                        hp_40_50 =?,
                        atk_40_50 =?,
                        def_40_50 =?,
                        hp_40_40 =?,
                        atk_40_40 =?,
                        def_40_40 =?,
                        hp_20_40 =?,
                        atk_20_40 =?,
                        def_20_40 =?,
                        hp_20_20 =?,
                        atk_20_20 =?,
                        def_20_20 =?,
                        hp_1_20 =?,
                        atk_1_20 =?,
                        def_1_20 =?,
                        spsecial_0 =?,
                        special_1 =?,
                        special_2 =?,
                        special_3 =?,
                        special_4 =?,
                        special_5 =?,
                        special_6 =?,
                        is_active =?
                  WHERE
                       id = ?
                 `,
                 deleteRow:`
                      UPDATE
                        genshin
                      SET 
                          is_active = 0
                      WHERE
                           id = ?
                           `,

}

module.exports = genshinModel;