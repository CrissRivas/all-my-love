import User from "../models/User";

export const createUser = (req, res) => {
    res.json('creando usuario')
}

export const getUser = async(req, res) => {
    const user = await User.findById(req.userId, { password: 0 })
    res.status(201).json(user)
}

export const addKartUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        if (user.Kart.includes(req.params.comicId)) {
            res.status(201).json({ message: "Ya en la lista" })
        } else {
            user.Kart.push(req.params.comicId)
            await User.findByIdAndUpdate(req.userId, user, { new: true })
            res.status(201).json({ message: "All OK" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteKartUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        if (user.Kart.includes(req.params.comicId)) {
            user.Kart.forEach((element, index) => {
                if (element == req.params.comicId) {
                    user.Kart.splice(index, 1)
                }
            });
            await User.findByIdAndUpdate(req.userId, user, { new: true })
            res.status(201).json({ message: "All OK" })
        } else {
            res.status(201).json({ message: "Ya no esta en la lista" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}