const {request, response} = require('express');
const bcrypt = require('bcrypt');
const genshinModel = require('../models/genshin');
const pool = require('../db');

const listGenshin = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection();

        const genshin = await conn.query(genshinModel.getAll, (err) =>{
            if(err){
                throw err;
            }

        })
        res.json(genshin);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);     
    }finally{
        if(conn){
            conn.end();
        }
    }
}

const listGenshinByID = async (req = request, res = response) =>{
    const {id} = req.params;
    let conn;

    if(isNaN(id)){
        res.status(400).json({msg: `The ID ${id} is invalid`});
        return;
    }

    try {
        conn = await pool.getConnection();

        const [genshin] = await conn.query(genshinModel.getByID, [id], (err) => {
            if(err){
                throw err;
            }
        })

        if(!genshin){
            res.status(404).json({msg: `character with ID ${id} not found`});
            return;
        }
        res.json(genshin);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }finally{
        if(conn){
            conn.end();
        }
    }
}

const addCharacters =async (req = request, res = response) => {
    const {
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
        is_active = 1
    }= req.body

    if(!password || !character_name || !rarity || !region || !vision || !weapon_type || !model || !constellation || !birthday || !special_dish 
        || !affiliation || !voice_eng || !voice_cn || !voice_jp || !voice_kr || !release_date || !ascension || !ascension_specialty || !ascension_talent
        || !ascension_boss || !talent_book || !talent_weekly || !hp_90_90 || !atk_90_90 || !def_90_90 || !hp_80_90 || !atk_80_90 || !def_80_90 || !hp_80_80 || !atk_80_80
        || !def_80_80 || !hp_70_80 || !atk_70_80 || !def_70_80 || !hp_70_70 || !atk_70_70 || !def_70_70 || !hp_60_70 || !atk_60_70 || !def_60_70 || !hp_60_60 || !atk_60_60
        || !def_60_60 || !hp_50_60 || !atk_50_60 || !def_50_60 || !hp_50_50 || !atk_50_50 || !def_50_50 || !hp_40_50 || !atk_40_50 || !def_40_50 || !hp_40_40 || !atk_40_40 || !def_40_40
        || !hp_20_40 || !atk_20_40 || !def_20_40 || !hp_20_20 || !atk_20_20 || !def_20_20 || !hp_1_20 || !atk_1_20 || !def_1_20 || !spsecial_0 || !special_1 || !special_2|| !special_3
        || !special_4 || !special_5 || !special_6){
        res.status(400).json({msg: 'Missing iformation'});
        return;

    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const genshin = [passwordHash, character_name, rarity, region, vision, weapon_type, model, constellation, birthday, special_dish,
        affiliation, voice_eng, voice_cn, voice_jp, voice_kr, release_date, ascension, ascension_specialty, ascension_talent, ascension_boss,
        talent_book, talent_weekly, hp_90_90, atk_90_90, def_90_90, hp_80_90, atk_80_90, def_80_90, hp_80_80, atk_80_80, def_80_80, hp_70_80,
        atk_70_80, def_70_80, hp_70_70, atk_70_70, def_70_70, hp_60_70, atk_60_70, def_60_70, hp_60_60, atk_60_60, def_60_60, hp_50_60,
        atk_50_60, def_50_60, hp_50_50, atk_50_50, def_50_50, hp_40_50, atk_40_50, def_40_50, hp_40_40, atk_40_40, def_40_40, hp_20_40,
        atk_20_40, def_20_40, hp_20_20, atk_20_20, def_20_20, hp_1_20, atk_1_20, def_1_20, spsecial_0, special_1, special_2, special_3, special_4,
        special_5, special_6, is_active]
    let conn;

    try {
        conn = await pool.getConnection();

        const [usernameExist] = await conn.query(genshinModel.getByUsername, [character_name], (err) => {
            if(err) throw err;
        })
        if (usernameExist){
            res.status(409).json({msg: `The character ${character_name} already exists`});
            return;
        }

        const genshinAdd = await conn.query(genshinModel.addRow, [...genshin], (err) =>{
            if(err) throw err;
        })
        if(genshinAdd.affectedRows === 0){
            throw new Error('character not added');
        }
        res.json({msg: 'character added succesfully'});

        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }finally{
        if(conn) conn.end();
    }
}

const updateGenshin = async (req = request, res = response) =>{
    let conn;

    const{
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

    } = req.body;

    const {id} =req.params;

    let passwordHash;
    if(password){
        const saltRounds = 10;
        passwordHash = await bcrypt.hash(password, saltRounds);
    }

    let genshinNewData = [
        passwordHash,
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
    ];
    
    try{
        conn = await pool.getConnection();

        const [genshinExists] = await conn.query(genshinModel.getByID, [id], (err) =>{
            if(err) throw err;
        }
        );
        if(!genshinExists || genshinExists.is_active === 0){
            res.status(400).json({msg: `character with ID ${id} not found`});
            return
        }
        const [usernameExist] = await conn.query(genshinModel.getByUsername, [character_name], (err) => {
            if(err) throw err;
        })
        if (usernameExist){
            res.status(409).json({msg: `The character ${character_name} already exists`});
            return;
        }

        const genshinOldData = [
            genshinExists.password,
            genshinExists.character_name,
            genshinExists.rarity,
            genshinExists.region,
            genshinExists.vision,
            genshinExists.weapon_type,
            genshinExists.model,
            genshinExists.constellation,
            genshinExists.birthday,
            genshinExists.special_dish,
            genshinExists.affiliation,
            genshinExists.voice_eng,
            genshinExists.voice_cn,
            genshinExists.voice_jp,
            genshinExists.voice_kr,
            genshinExists.release_date,
            genshinExists.ascension,
            genshinExists.ascension_specialty,
            genshinExists.ascension_talent,
            genshinExists.ascension_boss,
            genshinExists.talent_book,
            genshinExists.talent_weekly,
            genshinExists.hp_90_90,
            genshinExists.atk_90_90,
            genshinExists.def_90_90,
            genshinExists.hp_80_90,
            genshinExists.atk_80_90,
            genshinExists.def_80_90,
            genshinExists.hp_80_80,
            genshinExists.atk_80_80,
            genshinExists.def_80_80,
            genshinExists.hp_70_80,
            genshinExists.atk_70_80,
            genshinExists.def_70_80,
            genshinExists.hp_70_70,
            genshinExists.atk_70_70,
            genshinExists.def_70_70,
            genshinExists.hp_60_70,
            genshinExists.atk_60_70,
            genshinExists.def_60_70,
            genshinExists.hp_60_60,
            genshinExists.atk_60_60,
            genshinExists.def_60_60,
            genshinExists.hp_50_60,
            genshinExists.atk_50_60,
            genshinExists.def_50_60,
            genshinExists.hp_50_50,
            genshinExists.atk_50_50,
            genshinExists.def_50_50,
            genshinExists.hp_40_50,
            genshinExists.atk_40_50,
            genshinExists.def_40_50,
            genshinExists.hp_40_40,
            genshinExists.atk_40_40,
            genshinExists.def_40_40,
            genshinExists.hp_20_40,
            genshinExists.atk_20_40,
            genshinExists.def_20_40,
            genshinExists.hp_20_20,
            genshinExists.atk_20_20,
            genshinExists.def_20_20,
            genshinExists.hp_1_20,
            genshinExists.atk_1_20,
            genshinExists.def_1_20,
            genshinExists.spsecial_0,
            genshinExists.special_1,
            genshinExists.special_2,
            genshinExists.special_3,
            genshinExists.special_4,
            genshinExists.special_5,
            genshinExists.special_6,
            genshinExists.is_active,
        ];

        genshinNewData.forEach((genshinData, index) =>{
            if(!genshinData){
                genshinNewData[index] = genshinOldData[index];
            }
        })
        const genshinUpdated = await conn.query(
            genshinModel.updateRow,[...genshinNewData, id],
            (err) => {
                if (err) throw err;
            }
        )
        if (genshinUpdated.affectedRows === 0){
            throw new Error('character not updated');
        }
        res.json({msg: 'character updated succesfully'});
    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn) conn.end();
    }
}

const deleteGenshin = async (req = request, res = response)=>{
    let conn;
    const {id} = req.params;

    try {
        conn = await pool.getConnection();

        const [genshinExists] = await conn.query(genshinModel.getByID, [id], (err) =>{
            if(err) throw err;
        }
        );
        if(!genshinExists || genshinExists.is_active === 0){
            res.status(400).json({msg: `character with ID ${id} not found`});
            return
        }
        const genshinDeleted = await conn.query(
            genshinModel.deleteRow, [id], (err) =>{
                if(err) throw err;
            }
        );
        if(genshinDeleted.affectedRows === 0){
            throw new Error('character not deleted');
        }
        res.json({msg: 'character deleted succesfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
    }finally{
        if(conn) conn.end();
    }
}

const signInUser = async (req = request, res = response) =>{
    let conn;

    const {character_name, password} = req.body;

    try{
        conn = await pool.getConnection();

        if(!character_name || !password){
            res.status(400).json({msg: 'You must send character and password'});
            return;
        }

        const [genshin] = await conn.query(genshinModel.getByUsername,
            [character_name],
            (err) =>{
                if(err)throw err;
            }
            );
            if (!genshin){
                res.status(400).json({msg: `Wrong character or password`});
                return;
            }

            const passwordOK = await bcrypt.compare(password, genshin.password);

            if(!passwordOK){
                res.status(404).json({msg: `Wrong character or password`});
                return;
            }

            delete(genshin.password);

            res.json(genshin);
    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }finally{
        if(conn) conn.end();
    }
}

module.exports = {listGenshin, listGenshinByID, addCharacters, deleteGenshin, updateGenshin, signInUser}

