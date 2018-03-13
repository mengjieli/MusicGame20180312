global.lib = global.lib || {};


require("./ts/TypeScript");

require("./system/System");

require("./utils/ObjectDo");
require("./utils/StringDo");
require("./utils/NumberDo");
require("./utils/ByteArray");
require("./utils/PNGDecoder");
require("./utils/PNGEncoder");
require("./utils/UTFChange");
require("./utils/DelayCall");
require("./utils/MD5");

require("./event/Event");
require("./event/EventDispatcher");

require("./file/File");
require("./file/FileWatch");