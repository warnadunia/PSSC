import os
import re

directories = [
    r'c:\__D__Data\www\PSSC\web\src\app\(dashboard)\athlete',
    r'c:\__D__Data\www\PSSC\web\src\app\(dashboard)\coach'
]

def fix_buttons(content):
    def replacer(match):
        cls = match.group(0)
        if 'bg-[#ff4b4b]' in cls or 'bg-amber-500' in cls or 'bg-blue-500' in cls or 'bg-blue-600' in cls or 'bg-emerald-500' in cls or 'bg-red-500' in cls or 'bg-red-700' in cls:
            cls = cls.replace('text-slate-900 dark:text-white', 'text-white')
            cls = cls.replace('hover:text-slate-900 dark:hover:text-white', 'hover:text-white')
        return cls
        
    return re.sub(r'className=[\'\"`\{](.+?)[\'\"`\}]', replacer, content, flags=re.DOTALL)

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                original = content
                content = fix_buttons(content)
                
                if content != original:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'Fixed buttons in {file_path}')
