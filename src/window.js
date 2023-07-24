/* window.js
 *
 * Copyright 2023 julian
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import GObject from "gi://GObject";
import Gtk from "gi://Gtk";
import Gdk from "gi://Gdk";
import Gio from "gi://Gio";
import Adw from "gi://Adw";
import { POKEDEX } from "./pokedex.js";

const Item = GObject.registerClass(
  {
    GTypeName: "Item",
    InternalChildren: [],
  },
  class Item extends Adw.ActionRow {
    constructor(title, subtitle) {
      super();
      this.title = title;
      this.subtitle = subtitle;
      const avatar = new Adw.Avatar();
      avatar["margin-top"] = 12;
      avatar["margin-bottom"] = 12;
      avatar.size = 56;
      this.add_prefix(avatar);

      // I need to set avatar images from the resource file
      // I don't know how to do it
      // I tried this:

      // const texture = Gdk.Texture.new_from_resource(
      //   "/com/jkominovic/pokedex/data/icons/hires/001.png"
      // );

      // avatar_image.set_custom_image(texture);

      // Pokemon sprites are located in data/icons/hires but I couldn't find a way to access them
      // I tried several things but I couldn't find a way to do it
      // I guess I'm missing some build configuration or something
    }
  }
);

export const PokedexWindow = GObject.registerClass(
  {
    GTypeName: "PokedexWindow",
    Template: "resource:///com/jkominovic/pokedex/window.ui",
    InternalChildren: ["header_bar", "pokemon_list", "entry_pokemon_search"],
  },
  class PokedexWindow extends Adw.ApplicationWindow {
    constructor(application) {
      super({ application });
      this._entry_pokemon_search.connect("changed", (e) => {
        console.log(e);
      });

      POKEDEX.forEach((pokemon) => {
        const item = new Item(
          pokemon.name.english,
          `${pokemon.id} - ${pokemon.type.join(", ")}`
        );
        this._pokemon_list.append(item);
      });
    }
  }
);
